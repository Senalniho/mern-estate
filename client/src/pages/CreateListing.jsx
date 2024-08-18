import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 MB max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one image");
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price must be lower than regular price");
      setLoading(true);
      setError(false);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-4 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center my-8">Create a Listing</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Name"
            className="border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            placeholder="Description"
            className="border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
            rows="5"
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="sale"
                className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span className="text-gray-700">Sell</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="rent"
                className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span className="text-gray-700">Rent</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="parking"
                className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span className="text-gray-700">Parking spot</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span className="text-gray-700">Furnished</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="offer"
                className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span className="text-gray-700">Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p className="text-gray-700">Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p className="text-gray-700">Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                required
                className="border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p className="text-gray-700">Regular price</p>
                {formData.type === "rent" && (
                  <span className="text-xs text-gray-500">($ / month)</span>
                )}
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="10000000"
                  required
                  className="border p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col items-center">
                  <p className="text-gray-700">Discounted price</p>
                  {formData.type === "rent" && (
                    <span className="text-xs text-gray-500">($ / month)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <p className="font-semibold text-gray-800">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex flex-col gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 bg-blue-600 text-white rounded-lg uppercase hover:shadow-lg transition-all disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-600 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border border-gray-300 rounded-lg items-center"
              >
                <img
                  src={url}
                  alt="listing"
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-2 bg-red-600 text-white rounded-lg hover:opacity-75 transition-all"
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className="p-4 bg-green-600 text-white rounded-lg uppercase hover:bg-green-700 transition-all disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create listing"}
          </button>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}
