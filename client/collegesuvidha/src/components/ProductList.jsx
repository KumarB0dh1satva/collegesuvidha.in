import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import { Button } from '@material-tailwind/react';


const ProductList = (props) => {
  // console.log("featured",props?.isFeatured,props.loading)
  const [currentPage, setCurrentPage] = useState(props?.currentPage === undefined ? 1 : props.currentPage);
  const itemsPerPage = 18;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems;
  if (props.pagi === true)
    currentItems = props?.filteredProductList.slice(indexOfFirstItem, indexOfLastItem);
  else
    currentItems = props?.filteredProductList

  const totalPages = Math.ceil(props?.filteredProductList.length / itemsPerPage);
  //   console.table(currentItems)
  const handlePageChange = (page) => {
    props.setPage(page)

  };
  useEffect(() => {
    setCurrentPage(props?.currentPage);
  }, [props?.currentPage])
  if (props?.loading)
    return <>Loading</> // use your loading state or component

  return (
    <>
      <div className="bg-white pb-4">
        <div className="mx-auto max-w-2xl px-2 py-8 sm:px-0 sm:py-3 lg:max-w-7xl lg:px-2">
          {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2> */}

          <div className="mt-1 grid  grid-cols-1 gap-x-4 gap-y-10  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8 relative">
            {currentItems.map((product) => (
              <div key={product.id} className="group min-h-[150px] relative max-h-[300px] xl:min-w-[200px] xm:flex xm:justify-cneter">
                <Link to={`/productDetails/${product?.id}`}>
                  <div className="aspect-h-1 aspect-w-1  flex justify-center overflow-hidden min-h-[200px] bg-gray-200 lg:aspect-none group-hover:opacity-75  border border-gray-400 rounded-t-md">
                    <img
                      src={product.thumbnail}
                      alt="{product.imageAlt}"
                      className="h-[200px] md:h-[150px] object-cover object-center lg:h-[200px] "
                    />
                  </div>
                </Link>
                <Link to={`/productDetails/${product?.id}`}>
                  <div className=" flex justify-between border border-gray-400 rounded-b-md border-t-0 p-2 ">

                    <div>
                      <h3 className="text-sm text-gray-700">

                        <span aria-hidden="true" className="text-lg font-bold text-black truncate block" >

                          {(product.title.length > 20) ? product.title.substring(0, 20) + '..' : product.title}
                        </span>

                      </h3>
                      <p className=" text-sm text-gray-500">{product.category}</p>
                    </div>
                    <p className="text-md font-bold  text-green-600">₹ {product.price}</p>
                  </div>
                </Link>
                {props.isFeatured && <span
                  className="absolute top-0 left-0 bg-yellow-100 px-2 py-1 m-2 rounded z-50"
                  // onClick={toggleFeatured}
                >
                  Featured
                </span>}
              </div>
            ))}
            
          </div>
          {props.viewBtn && <Link to={`/allproducts`}> 
                        <div className='flex justify-center mt-5'>
    
                            <Button className='ml-1 text-xs text-white xl:text-sm font-bold bg-cs-textHdClr '>Click to View More...</Button>
                        </div>
                    </Link>}
          {props?.pagi && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}

        </div>
      </div>
    </>
  )
}

export default ProductList




