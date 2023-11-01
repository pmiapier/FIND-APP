import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import ImageCompress from 'quill-image-compress';
import Button from '../buttons/Button';
import { useModal } from '../../Hooks/useModal';
import { useState } from 'react';

Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageCompress', ImageCompress);

const modules = {
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize'],
    background: 'black',
    padding: '100px',
  },
  imageCompress: {
    quality: 1.0,
    maxWidth: 1000,
    maxHeight: 1000,
    imageType: 'image/jpeg',
    debug: true,
    suppressErrorLogging: false,
    insertIntoEditor: undefined,
  },
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blackquote'],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    [{ direction: 'rtl' }],
    ['clean'],
  ],
};

const UserAddProduct = ({ category, onCloseModal }) => {
  const [input, setInput] = useState({
    itemFile: [],
    itemName: '',
    itemCategory: '',
    itemDescription: '',
    itemPrice: '',
  });

  const handleInput = (e) => {
    if (e.target.name === `file`)
      return setInput({ ...input, [e.target.name]: e.target.files[0] });
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleItemDescription = (value) => {
    setInput({ ...input, itemDescription: value });
  };
  console.log(input);

  const handleSubmit = async (e) => {};

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-5 px-12 pt-5 pb-12 bg-white rounded-lg
    shadow-lg'
    >
      <div className='text-[30px]'>ข้อมูลสินค้่า</div>
      <div className='grid grid-cols-9 gap-y-10 pl-1'>
        <div className='col-span-1'>
          <span className='text-red-600'>*</span>ภาพสินค้า
        </div>
        <input
          type='file'
          className='col-span-8'
          name='itemFile'
          onChange={handleInput}
        ></input>

        <div className='col-span-1'>
          <span className='text-red-600'>*</span>ชื่อสินค้่า
        </div>
        <input
          className='col-span-8 pl-1 rounded-sm border-gray-200 border-2 py-2'
          type='text'
          placeholder='ชื่อสินค้า'
          name='itemName'
          onChange={handleInput}
        />

        <div className='col-span-1'>
          <span className='text-red-600'>*</span>เลือกหมวดหมู่
        </div>
        <select
          className='col-span-8 pl-1 rounded-sm border-gray-200 border-2 py-2'
          name='itemCategory'
          onChange={handleInput}
        >
          {category.map((item, index) => {
            return <option value={item}>{item}</option>;
          })}
        </select>

        <div className='col-span-1'>
          <span className='text-red-600'>*</span>รายละเอียดสินค้า
        </div>
        {/* <textarea className="outline outline-1 col-span-8 pl-1" cols="30" rows="4"></textarea> */}
        <div className='col-span-8'>
          <ReactQuill
            theme='snow'
            placeholder='Content...'
            name='itemDescription'
            onChange={handleItemDescription}
            modules={modules}
            // value={input.itemDescription}
          />
        </div>

        <div className='col-span-1'>
          <span className='text-red-600'>*</span>รายเช่าต่อวัน
        </div>
        <input
          className='appearance-none pl-1 rounded-sm border-gray-200 border-2 py-2'
          type='number'
          name='itemPrice'
          onChange={handleInput}
        />
      </div>
      <div className='flex gap-5'>
        <Button text='ยืนยัน' className='bg-blue-500' />
        <Button
          onClick={() => onCloseModal()}
          text='ยกเลิก'
          className='bg-red-500'
        />
      </div>
    </form>
  );
};

export default UserAddProduct;
