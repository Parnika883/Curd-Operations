import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Curd.css';

const Curd = () => {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [editId, setEditID] = useState(-1);

  useEffect(() => {
    axios.get("https://dummyjson.com/products")
      .then(res => setProducts(res.data.products))
      .catch(err => console.log(err));
  }, []);

  const handleAdd = () => {
    axios.post('https://dummyjson.com/products/add', { title, brand })
      .then(res => {
        const newProduct = { id: res.data.id, title, brand };
        setProducts([...products, newProduct]);
        setTitle('');
        setBrand('');
        alert('Product added successfully!');
      })
      .catch(err => console.log(err));
  };

  const handleUpdate = () => {
    axios.put('https://dummyjson.com/products/' + editId, { title, brand })
      .then(res => {
        setProducts(products.map(product =>
          product.id === editId ? { ...product, title, brand } : product
        ));
        setEditID(-1);
        setTitle('');
        setBrand('');
        alert('Product updated successfully!');
      })
      .catch(err => console.log(err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editId === -1) {
      handleAdd();
    } else {
      handleUpdate();
    }
  };

  const handleEdit = (id) => {
    const product = products.find(p => p.id === id);
    setTitle(product.title);
    setBrand(product.brand);
    setEditID(id);
  };

  const handleDelete = (id) => {
    axios.delete('https://dummyjson.com/products/' + id)
      .then(res => {
        setProducts(products.filter(product => product.id !== id));
        alert('Product deleted successfully!');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='container'>
      <div className='form-div'>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Enter Title' value={title} onChange={e => setTitle(e.target.value)} />
          <input type='text' placeholder='Enter Brand' value={brand} onChange={e => setBrand(e.target.value)} />
          <button type='submit' >{editId === -1 ? 'Add' : 'Update'}</button>
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Brand</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.brand}</td>
              <td>
                <button type="button" onClick={() => handleDelete(product.id)}>Delete</button>
                <button type="button" onClick={() => handleEdit(product.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Curd;
