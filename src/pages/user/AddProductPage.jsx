import Button from '../../components/buttons/Button';
import InputField from '../../components/inputs/InputField';
import Joi from 'joi';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useProduct } from '../../hooks/useProduct';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const schema = Joi.object({
  itemName: Joi.string().max(150).required().label('ชื่อสินค้า'),
  itemCategory: Joi.string().required().label('หมวดหมู่'),
  itemDescription: Joi.string().required().label('รายละเอียดสินค้า'),
  itemPrice: Joi.number().required().label('ราคาเช่าต่อวัน'),
  itemFile: Joi.array().min(1).max(4).required().label('ภาพสินค้า')
});

export default function AddProductPage() {
  const navigate = useNavigate();
  const { selectedProduct, clearSelectedProduct, categoryList } = useProduct();

  const [input, setInput] = useState({
    itemName: '',
    itemCategory: '',
    itemDescription: '',
    itemPrice: '',
    availability: 'available'
  });
  //# New File Input Image Preview ##################################################
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const onSelectFile = (e) => {
    const selectedFilesFromInput = e.target.files;
    const selectedFilesArray = Array.from(selectedFilesFromInput);
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    setSelectedFiles((prevFiles) => [...prevFiles, ...selectedFilesFromInput]);
    console.log('selectedFiles', selectedFiles);
  };
  //###############################################################################

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
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
    const formdata = new FormData();
    for (const key in input) {
      formdata.append(key, input[key]);
    }

    selectedFiles.forEach((file, index) => {
      formdata.append(`file[${index}]`, file);
    });

    clearSelectedProduct();

    const headers = {
      Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
      'Content-Type': 'multipart/form-data'
    };
    const res = await axios.post(`/user/postItem`, formdata, { headers });
    console.log(res);
    if (res.data.message === `post done`) {
      toast.success('เพิ่มสินค้าสำเร็จ', {
        position: toast.POSITION.TOP_CENTER
      });
      clearSelectedProduct();
    }
    navigate('/my-product');
  };

  const handleCancel = () => {
    navigate('/my-product');
  };

  return (
    <form
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 px-12 pt-5 pb-12 bg-white rounded-lg
        shadow-lg"
    >
      <div className="flex justify-between items-center">
        <div className="text-[30px]">ข้อมูลสินค้า</div>
      </div>
      <div className="flex flex-col space-y-4">
        {/* Product Image */}
        <div className="flex flex-row">
          <div className="basis-36">
            <span className="text-red-600">*</span>ภาพสินค้า
          </div>
          {/* <div className="basis-full">
            <div className="relative flex flex-row gap-2">
              {files.length > 0 ? (
                files.map((file, index) => (
                  <div key={index} className="relative border border-dotted rounded-md p-1">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Selected Image ${index}`}
                      style={{ maxWidth: '80px', maxHeight: '80px' }}
                    />
                    <div
                      className="text-white bg-red-500 text-[8px] rounded-full px-2 py-1 font-bold absolute top-[-5px] right-[-5px] cursor-pointer"
                      onClick={() => {
                        const updatedFiles = [...files];
                        updatedFiles.splice(index, 1);
                        setFiles(updatedFiles);
                      }}
                    >
                      X
                    </div>
                  </div>
                ))
              ) : selectedProduct ? (
                selectedProduct.images.map((file, index) => (
                  <div key={index} className="relative border border-dotted rounded-md p-1">
                    <img
                      src={file.imageUrl}
                      alt={`Selected Image ${index}`}
                      style={{ maxWidth: '80px', maxHeight: '80px' }}
                    />
                    <div
                      className="text-white bg-red-500 text-[8px] rounded-full px-2 py-1 font-bold absolute top-[-5px] right-[-5px] cursor-pointer"
                      onClick={() => {
                        const updatedFiles = [...files];
                        updatedFiles.splice(index, 1);
                        setFiles(updatedFiles);
                      }}
                    >
                      X
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}
              {files.length < 4 && (
                <div
                  className="border border-dashed relative flex items-center"
                  style={{ width: '80px', maxWidth: '80px', height: '80px', maxHeight: '80px' }}
                >
                  {imagePreview && (
                    <div className="w-full h-full">
                      <img src={imagePreview} alt="Selected Image" style={{ maxWidth: '80px', maxHeight: '80px' }} />
                      <div className="absolute top-0 right-0 text-red-500 font-bold" onClick={handleRemoveImage}>
                        x
                      </div>
                    </div>
                  )}
                  <label htmlFor="itemFile" className="custom-file-input" style={{ cursor: 'pointer' }}>
                    <i className="file-upload-icon flex items-center justify-center">
                      <svg viewBox="0 0 23 21" xmlns="http://www.w3.org/2000/svg" className="h-[23px] w-[23px]">
                        <path d="M18.5 0A1.5 1.5 0 0120 1.5V12c-.49-.07-1.01-.07-1.5 0V1.5H2v12.65l3.395-3.408a.75.75 0 01.958-.087l.104.087L7.89 12.18l3.687-5.21a.75.75 0 01.96-.086l.103.087 3.391 3.405c.81.813.433 2.28-.398 3.07A5.235 5.235 0 0014.053 18H2a1.5 1.5 0 01-1.5-1.5v-15A1.5 1.5 0 012 0h16.5z"></path>
                        <path d="M6.5 4.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM18.5 14.25a.75.75 0 011.5 0v2.25h2.25a.75.75 0 010 1.5H20v2.25a.75.75 0 01-1.5 0V18h-2.25a.75.75 0 010-1.5h2.25v-2.25z"></path>
                      </svg>
                    </i>
                    <div className="text-xs text-center">
                      เพิ่มรูปภาพ <span>({files.length}/4)</span>
                    </div>
                  </label>
                  <input
                    type="file"
                    id="itemFile"
                    name="itemFile"
                    onChange={handleInput}
                    multiple
                    style={{ display: 'none' }}
                  />
                </div>
              )}
            </div>
          </div> */}
          {/* ถ้าภาพมากกว่า 0 จะแสดงรูปภาพ */}
          {selectedImages &&
            selectedImages.length > 0 &&
            selectedImages.map((image, index) => {
              return (
                <div
                  key={image}
                  className="border border-dashed relative flex items-center mr-4"
                  style={{ width: '80px', maxWidth: '80px', height: '80px', maxHeight: '80px' }}
                >
                  <div className="relative">
                    <img src={image} alt="upload" style={{ width: '100%', height: '100%' }} className="object-cover" />
                  </div>
                  <button
                    onClick={() => handleRemoveImage(image)}
                    className="text-white bg-red-500 text-[8px] rounded-full px-2 py-1 font-bold absolute top-[-5px] right-[-5px] cursor-pointer"
                  >
                    X
                  </button>
                  <p className="text-white bg-gray-500 text-[8px] rounded-full px-2 py-1 font-bold absolute top-[-5px] left-[-5px]">
                    {index + 1}
                  </p>
                </div>
              );
            })}
          {/* ถ้าภาพมากกว่า 4 ตัว input field จะไม่แสดง */}
          {selectedImages && selectedImages.length < 4 && (
            <div
              className="border border-dashed relative flex items-center"
              style={{ width: '80px', maxWidth: '80px', height: '80px', maxHeight: '80px' }}
            >
              <label htmlFor="itemFile" style={{ cursor: 'pointer' }}>
                <i className="file-upload-icon flex items-center justify-center">
                  <svg viewBox="0 0 23 21" xmlns="http://www.w3.org/2000/svg" className="h-[23px] w-[23px]">
                    <path d="M18.5 0A1.5 1.5 0 0120 1.5V12c-.49-.07-1.01-.07-1.5 0V1.5H2v12.65l3.395-3.408a.75.75 0 01.958-.087l.104.087L7.89 12.18l3.687-5.21a.75.75 0 01.96-.086l.103.087 3.391 3.405c.81.813.433 2.28-.398 3.07A5.235 5.235 0 0014.053 18H2a1.5 1.5 0 01-1.5-1.5v-15A1.5 1.5 0 012 0h16.5z"></path>
                    <path d="M6.5 4.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM18.5 14.25a.75.75 0 011.5 0v2.25h2.25a.75.75 0 010 1.5H20v2.25a.75.75 0 01-1.5 0V18h-2.25a.75.75 0 010-1.5h2.25v-2.25z"></path>
                  </svg>
                </i>
                <div className="text-xs text-center">
                  เพิ่มรูปภาพ <span>({selectedImages.length}/4)</span>
                </div>
              </label>
              <input
                type="file"
                id="itemFile"
                name="itemFile"
                onChange={onSelectFile}
                multiple
                accept="image/*"
                style={{ display: 'none' }}
              />
            </div>
          )}
        </div>

        {/* Product Title */}
        <div className="flex ">
          <div className="basis-36">
            <span className="text-red-600">*</span>ชื่อสินค้า
          </div>
          <div className="basis-full">
            <InputField
              placeholder="Product Title"
              name="itemName"
              onChange={handleInput}
              limitText="150"
              value={input.itemName}
              hasError=""
            />
          </div>
        </div>
        {/* Category */}
        <div className="flex">
          <div className="basis-36">
            <span className="text-red-600">*</span>เลือกหมวดหมู่
          </div>
          <select
            className="basis-full pl-1 rounded-md border-gray-200 border-2 py-2"
            name="itemCategory"
            onChange={handleInput}
            value={input.itemCategory || (selectedProduct ? selectedProduct.categories.name : '')}
          >
            <option className="hidden" disabled value="">
              โปรดเลือกหมวดหมู่
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
            <span className="text-red-600">*</span>รายละเอียดสินค้า
          </div>
          <div className="basis-full">
            <textarea
              name="itemDescription"
              onChange={handleInput}
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
            <span className="text-red-600">*</span>ราคาเช่าต่อวัน
          </div>
          <div className="basis-full">
            <InputField
              type="number"
              placeholder="Product Price"
              name="itemPrice"
              onChange={handleInput}
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
            <select name="availability" onChange={handleInput}>
              <option value="available">available</option>
              <option value="unavailable">unavailable</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex gap-5">
        <Button text="ยืนยัน" className="bg-blue-500" />
        <Button text="ยกเลิก" className="bg-red-500" event={handleCancel} />
      </div>
    </form>
  );
}