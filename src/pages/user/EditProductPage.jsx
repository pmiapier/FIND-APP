import { useProduct } from '../../hooks/useProduct';
import { useEffect, useState } from 'react';
import InputField from '../../components/inputs/InputField';
import Button from '../../components/buttons/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from '../../components/loading/Loading';

export default function EditProductPage() {
  const { selectedProduct, saveProductChanges, clearSelectedProduct, categoryList, getMyProductData } = useProduct();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    itemName: '',
    itemCategory: '',
    itemDescription: '',
    itemPrice: '',
    availability: ''
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setInput({
        itemName: selectedProduct?.title || '',
        itemCategory: selectedProduct?.categories.name || '',
        itemDescription: selectedProduct?.description || '',
        itemPrice: selectedProduct?.price || '',
        availability: selectedProduct?.status || ''
      });
    }

    selectedProduct?.images?.map(async (item, index) => {
      const filesname = Math.random() * 10000000;
      const x = await axios.get(item.imageUrl, { responseType: 'blob' });
      const file = new File([x.data], filesname);
      const arr = selectedFiles;
      arr.push(file);
      setSelectedFiles(arr);
    });
    setSelectedImages(selectedProduct?.images?.map((image) => image?.imageUrl));
  }, [selectedProduct]);

  const handleInputChange = (e) => {
    if (e.target.files) {
      const selectedFilesArray = Array.from(e.target.files);
      const imagesArray = selectedFilesArray.map((file) => URL.createObjectURL(file));

      setSelectedImages((prevImages) => prevImages.concat(imagesArray));
      setSelectedFiles((prevFiles) => prevFiles.concat(selectedFilesArray));
    } else {
      console.log('ttt', e.target.name);
      setInput({ ...input, [e.target.name]: e.target.value });
    }
  };

  const handleRemoveImage = (image) => {
    const imageIndexToRemove = selectedImages.indexOf(image);
    const updatedImages = [...selectedImages];
    updatedImages.splice(imageIndexToRemove, 1);

    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(imageIndexToRemove, 1);

    setSelectedImages(updatedImages);
    setSelectedFiles(updatedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('loading handleSubmit: .........', loading);
    if (selectedProduct) {
      const payload = {
        title: input.itemName,
        categories: input.itemCategory,
        description: input.itemDescription,
        price: input.itemPrice,
        id: selectedProduct.id,
        availability: input.availability
      };

      payload.images = selectedFiles;

      const formData = new FormData();
      for (const key in payload) {
        formData.append(key, payload[key]);
      }

      payload.images.forEach((file, index) => {
        formData.append(`file[${index}]`, file);
      });

      try {
        setLoading(true);
        // console.log('loading in try: .........', loading);
        await saveProductChanges(payload);
        Swal.fire('Success', 'Product details updated successfully', 'success');
      } catch (error) {
        Swal.fire('Failed', 'Product update failed', 'error');
      } finally {
        setLoading(false);
      }
      // console.log('loading after try: .........', loading);
      saveProductChanges(payload);
      clearSelectedProduct();
      navigate('/my-product', { state: { a: 20 } });
    }
  };

  const handleCancel = () => {
    clearSelectedProduct();
    navigate('/my-product');
  };

  if (!selectedProduct) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      {loading && <Loading />}
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 px-12 pt-5 pb-12 bg-white rounded-lg
      shadow-lg"
      >
        <div className="flex justify-between items-center">
          <div className="text-[30px]">Item Details</div>
        </div>
        <div className="flex flex-col space-y-4">
          {/* Product Image */}
          <div className="flex flex-row ">
            <div className="basis-36">
              <span className="text-red-600">*</span>Item Images
            </div>

            <div className="basis-full">
              <div className="relative flex flex-row gap-2">
                {selectedImages &&
                  selectedImages.map((image, index) => (
                    <div key={index} className="relative border border-dotted rounded-md p-1">
                      <img
                        src={image}
                        alt={`Product Image ${index + 1}`}
                        style={{ maxWidth: '80px', maxHeight: '80px' }}
                      />

                      <div
                        className="text-white bg-red-500 text-[8px] rounded-full px-2 py-1 font-bold absolute top-[-5px] right-[-5px] cursor-pointer"
                        onClick={() => handleRemoveImage(image)}
                      >
                        X
                      </div>
                    </div>
                  ))}
                {selectedImages && selectedImages.length < 4 && (
                  <div
                    className={`border border-dashed relative flex items-center ${
                      selectedFiles.length < 4 ? '' : 'hidden'
                    }`}
                    style={{ width: '80px', maxWidth: '80px', height: '80px', maxHeight: '80px' }}
                  >
                    <label htmlFor="itemFile" style={{ cursor: 'pointer' }}>
                      <i className="file-upload-icon flex items-center justify-center">
                        <svg viewBox="0 0 23 21" xmlns="http://www.w3.org/2000/svg" className="h-[23px] w-[23px]">
                          <svg viewBox="0 0 23 21" xmlns="http://www.w3.org/2000/svg" className="h-[23px] w-[23px]">
                            <path d="M18.5 0A1.5 1.5 0 0120 1.5V12c-.49-.07-1.01-.07-1.5 0V1.5H2v12.65l3.395-3.408a.75.75 0 01.958-.087l.104.087L7.89 12.18l3.687-5.21a.75.75 0 01.96-.086l.103.087 3.391 3.405c.81.813.433 2.28-.398 3.07A5.235 5.235 0 0014.053 18H2a1.5 1.5 0 01-1.5-1.5v-15A1.5 1.5 0 012 0h16.5z"></path>
                            <path d="M6.5 4.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM18.5 14.25a.75.75 0 011.5 0v2.25h2.25a.75.75 0 010 1.5H20v2.25a.75.75 0 01-1.5 0V18h-2.25a.75.75 0 010-1.5h2.25v-2.25z"></path>
                          </svg>
                        </svg>
                      </i>
                      <div className="text-xs text-center">
                        add images <span>({selectedImages.length}/4)</span>
                      </div>
                    </label>
                    <input
                      type="file"
                      id="itemFile"
                      name="itemFile"
                      onChange={handleInputChange}
                      multiple
                      style={{ display: 'none' }}
                      disabled={selectedImages.length === 4}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Product Title */}
          <div className="flex ">
            <div className="basis-36">
              <span className="text-red-600">*</span>Item Name
            </div>
            <div className="basis-full">
              <InputField
                placeholder="Product Title"
                name="itemName"
                limitText="150"
                value={input.itemName}
                onChange={handleInputChange}
                hasError=""
              />
            </div>
          </div>
          {/* Category */}
          <div className="flex">
            <div className="basis-36">
              <span className="text-red-600">*</span>Item Category
            </div>
            <select
              className="basis-full pl-1 rounded-md border-gray-200 border-2 py-2"
              name="itemCategory"
              onChange={handleInputChange}
              value={input.itemCategory || (selectedProduct ? selectedProduct.categories.name : '')}
            >
              <option className="hidden" disabled value="">
                Please select category
              </option>
              {categoryList.map((item, index) => {
                return (
                  <option key={index} id={item.id} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          {/* Product Description */}
          <div className="flex">
            <div className="basis-36">
              <span className="text-red-600">*</span>Item Description
            </div>
            <div className="basis-full">
              <textarea
                name="itemDescription"
                onChange={handleInputChange}
                value={input.itemDescription}
                cols="30"
                rows="10"
                className="border border-gray-200 rounded-md w-full"
              />
            </div>
          </div>
          {/* Product Price */}
          <div className="flex">
            <div className="basis-36">
              <span className="text-red-600">*</span>Price per day
            </div>
            <div className="basis-full">
              <InputField
                onChange={handleInputChange}
                type="number"
                placeholder="Product Price"
                name="itemPrice"
                value={input.itemPrice}
                hasError=""
              />
            </div>
          </div>
          <div className="flex">
            <div className="basis-36">
              <span className="text-red-600">*</span>Availability
            </div>

            <div className="basis-full pl-1 rounded-md border-gray-200 border-2 py-2">
              <select name="availability" onChange={handleInputChange} value={input.availability}>
                <option value="available">available</option>
                <option value="unavailable">unavailable</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <Button text="Save Change" className="bg-blue-500" />
          <Button text="Cancel" className="bg-red-500" event={handleCancel} />
        </div>
      </form>
    </>
  );
}
