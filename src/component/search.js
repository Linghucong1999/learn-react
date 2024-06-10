import './style.css';
import { useState } from "react";

function FilterableProductTable({ product }) {
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);

    return (
        <div>
            <ProductTable product={product} filterText={filterText} inStockOnly={inStockOnly} />
        </div>
    )
}

function ProductCategoryRow({ category }) {
    return (
        <tr>
            <th colSpan={2}>
                {category}
            </th>
        </tr>
    )
}

function ProductRow({ product }) {
    const name = product.stocked ? product.name : <span style={{ color: 'red' }}>{product.name}</span>;
    return (
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    )
}

function ProductTable({ product, filterText, inStockOnly }) {
    const row = [];
    let lastCategory = null;
    product.forEach(item => {
        if (item.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
            return;
        }

        if (inStockOnly && !item.stocked) {
            return;
        }

        if (item.category !== lastCategory) {
            row.push(
                <ProductCategoryRow category={item.category} key={item.category} />
            )
        }
        row.push(
            <ProductRow product={item} key={item.name} />
        )



        lastCategory = item.category;
    })


    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>{row}</tbody>
        </table>
    )
}



const PRODUCTS = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];


export default function App() {
    return <FilterableProductTable product={PRODUCTS}></FilterableProductTable>
}