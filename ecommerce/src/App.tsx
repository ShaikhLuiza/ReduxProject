import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { showDetails } from "./productSlice";
import { addToCart, removeFromCart } from "./cartSlice";
import type { RootState } from "./store";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMinus,
  faPlus,
  faEye,
  faBoxOpen,
  faXmark,
  faStore,
} from "@fortawesome/free-solid-svg-icons";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isCartOpen, setIsCartOpen] = useState(false);

  const selectedProduct = useSelector(
    (state: RootState) => state.product.selectedProduct
  );

  const cartItems = useSelector(
    (state: RootState) => state.cart.cartItems
  );

  // Total quantity of all products
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Grand total
  const grandTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const getProducts = async (): Promise<Product[]> => {
    const response = await axios.get(
      "https://dummyjson.com/products"
    );

    return response.data.products;
  };

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  // ================= LOADING =================
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="text-sm font-medium text-slate-600">
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  // ================= ERROR =================
  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <Card className="w-full max-w-md rounded-2xl border-slate-200 shadow-lg">
          <CardContent className="pt-8 text-center">

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              <span className="text-xl font-bold text-red-500">
                !
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              Something went wrong
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              We couldn't load the products. Please try again.
            </p>

          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* =====================================================
          HEADER
      ===================================================== */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">

        <div className="mx-auto max-w-7xl px-4 sm:px-6">

          <div className="flex h-[68px] items-center justify-between gap-4">

            {/* Logo */}
            <div className="flex shrink-0 items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-200">
                <FontAwesomeIcon
                  icon={faStore}
                  className="text-sm"
                />
              </div>

              <div className="leading-none">
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                  Shop<span className="text-blue-600">Store</span>
                </h1>

                <p className="mt-1 hidden text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400 sm:block">
                  Discover products
                </p>
              </div>

            </div>

            {/* Search Bar */}
            <div className="hidden w-full max-w-lg md:block">

              <div className="flex h-10 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition-all focus-within:border-blue-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50">

                <svg
                  className="mr-3 h-4 w-4 shrink-0 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                  />
                </svg>

                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />

              </div>

            </div>

            {/* Cart */}
            <Button
              variant="outline"
              onClick={() => setIsCartOpen(true)}
              className="relative h-10 rounded-xl border-slate-200 bg-white px-3 text-slate-700 shadow-none transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 sm:px-4"
            >

              <FontAwesomeIcon
                icon={faCartShopping}
                className="text-sm"
              />

              <span className="ml-2 hidden font-semibold sm:inline">
                Cart
              </span>

              {cartCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                  {cartCount}
                </span>
              )}

            </Button>

          </div>

        </div>
      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">

        {/* Products Heading */}
        <div className="mb-7 flex items-end justify-between">

          <div>

            <div className="flex items-center gap-3">

             

              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  Products
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {products?.length ?? 0} products available
                </p>
              </div>

            </div>

          </div>

          {cartCount > 0 && (
            <Badge
              variant="secondary"
              className="hidden rounded-lg px-3 py-1.5 text-xs font-medium sm:flex"
            >
              {cartCount} {cartCount === 1 ? "item" : "items"} in cart
            </Badge>
          )}

        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {products?.map((product) => {

            const isSelected =
              selectedProduct?.id === product.id;

            const cartItem = cartItems.find(
              (item) => item.id === product.id
            );

            return (
              <Card
                key={product.id}
                className={`group overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                  isSelected
                    ? "border-blue-500 shadow-lg shadow-blue-100 ring-2 ring-blue-500/10"
                    : "border-slate-200 shadow-sm hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
                }`}
              >

                {/* Product Image */}
                <div className="relative flex h-52 items-center justify-center overflow-hidden bg-slate-50 p-5">

                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className={`h-full w-full object-contain transition-transform duration-500 ${
                      isSelected
                        ? "scale-105"
                        : "group-hover:scale-110"
                    }`}
                  />

                  {/* Product Number */}
                  <Badge className="absolute left-3 top-3 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[10px] font-semibold text-slate-600 shadow-sm hover:bg-white">
                    #{product.id}
                  </Badge>

                  {/* Selected */}
                  {isSelected && (
                    <Badge className="absolute right-3 top-3 rounded-lg bg-blue-600 px-2 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-blue-600">
                      Selected
                    </Badge>
                  )}

                  {/* Cart Quantity */}
                  {cartItem && cartItem.quantity > 0 && (
                    <Badge className="absolute bottom-3 right-3 rounded-lg bg-emerald-600 px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-emerald-600">
                      {cartItem.quantity} in cart
                    </Badge>
                  )}

                </div>

                {/* Product Header */}
                <CardHeader className="px-5 pb-2 pt-5">

                  <CardTitle className="line-clamp-2 min-h-12 text-base font-semibold leading-6 text-slate-900">
                    {product.title}
                  </CardTitle>

                </CardHeader>

                {/* Product Content */}
                <CardContent className="px-5">

                  <div className="flex items-center justify-between">

                    <p className="text-xl font-bold tracking-tight text-emerald-600">
                      ${product.price.toFixed(2)}
                    </p>

                    <Badge
                      variant="secondary"
                      className="rounded-lg bg-emerald-50 text-xs font-medium text-emerald-700 hover:bg-emerald-50"
                    >
                      In Stock
                    </Badge>

                  </div>

                  {/* Product Details */}
                  {isSelected && (
                    <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/50 p-4">

                      <div className="mb-3 flex items-center justify-between">

                        <h3 className="text-sm font-bold text-slate-900">
                          Product Details
                        </h3>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-lg text-slate-400 hover:bg-white hover:text-slate-700"
                          onClick={() =>
                            dispatch(showDetails(null))
                          }
                        >
                          <FontAwesomeIcon
                            icon={faXmark}
                          />
                        </Button>

                      </div>

                      <Separator className="mb-4 bg-blue-100" />

                      <div className="space-y-3 text-sm">

                        <div className="flex justify-between">
                          <span className="text-slate-500">
                            Product ID
                          </span>

                          <span className="font-semibold text-slate-900">
                            #{product.id}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-slate-500">
                            Price
                          </span>

                          <span className="font-semibold text-emerald-600">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-slate-500">
                            Availability
                          </span>

                          <span className="font-semibold text-emerald-600">
                            Available
                          </span>
                        </div>

                      </div>

                      <Button
                        className="mt-4 h-10 w-full rounded-xl bg-blue-600 font-semibold shadow-sm hover:bg-blue-700"
                        onClick={() =>
                          dispatch(addToCart(product))
                        }
                      >
                        <FontAwesomeIcon
                          icon={faCartShopping}
                        />

                        <span className="ml-2">
                          Add to Cart
                        </span>
                      </Button>

                    </div>
                  )}

                </CardContent>

                {/* Product Actions */}
                <CardFooter className="flex gap-2 px-5 pb-5 pt-1">

                  {/* View */}
                  <Button
                    variant={
                      isSelected
                        ? "secondary"
                        : "outline"
                    }
                    className="h-10 flex-1 rounded-xl font-medium"
                    onClick={() => {
                      if (isSelected) {
                        dispatch(showDetails(null));
                      } else {
                        dispatch(showDetails(product));
                      }
                    }}
                  >
                    <FontAwesomeIcon
                      icon={
                        isSelected
                          ? faXmark
                          : faEye
                      }
                    />

                    <span className="ml-2">
                      {isSelected
                        ? "Hide"
                        : "View"}
                    </span>
                  </Button>

                  {/* Decrease */}
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-10 w-10 rounded-xl"
                    onClick={() =>
                      dispatch(
                        removeFromCart(product.id)
                      )
                    }
                  >
                    <FontAwesomeIcon
                      icon={faMinus}
                      className="text-xs"
                    />
                  </Button>

                  {/* Increase */}
                  <Button
                    size="icon"
                    className="h-10 w-10 rounded-xl bg-blue-600 shadow-sm hover:bg-blue-700"
                    onClick={() =>
                      dispatch(
                        addToCart(product)
                      )
                    }
                  >
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="text-xs"
                    />
                  </Button>

                </CardFooter>

              </Card>
            );
          })}

        </div>

        {/* Empty State */}
        {!products?.length && (
          <div className="flex flex-col items-center justify-center py-24 text-center">

            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">

              <FontAwesomeIcon
                icon={faBoxOpen}
                className="text-3xl text-slate-300"
              />

            </div>

            <h3 className="text-lg font-bold text-slate-900">
              No products found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              There are no products available right now.
            </p>

          </div>
        )}

      </main>

      {/* =====================================================
          CART DRAWER
      ===================================================== */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">

          {/* Overlay */}
          <div
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">

            {/* Cart Header */}
            <div className="border-b border-slate-200 bg-white px-5 py-4">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <FontAwesomeIcon
                      icon={faCartShopping}
                    />
                  </div>

                  <div>

                    <h2 className="text-lg font-bold text-slate-900">
                      Shopping Cart
                    </h2>

                    <p className="text-xs text-slate-500">
                      {cartCount}{" "}
                      {cartCount === 1
                        ? "item"
                        : "items"}
                    </p>

                  </div>

                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  onClick={() =>
                    setIsCartOpen(false)
                  }
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                  />
                </Button>

              </div>

            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto bg-slate-50/50 p-5">

              {cartItems.length === 0 ? (

                <div className="flex h-full flex-col items-center justify-center text-center">

                  <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">

                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className="text-3xl text-slate-300"
                    />

                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    Your cart is empty
                  </h3>

                  <p className="mt-1 max-w-xs text-sm leading-6 text-slate-500">
                    Add some products to your cart and they will appear here.
                  </p>

                </div>

              ) : (

                <div className="space-y-3">

                  {cartItems.map((item) => {

                    const itemTotal =
                      item.price * item.quantity;

                    return (
                      <div
                        key={item.id}
                        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                      >

                        <div className="flex gap-4">

                          {/* Image */}
                          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-slate-100 p-2">

                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="h-full w-full object-contain"
                            />

                          </div>

                          {/* Information */}
                          <div className="min-w-0 flex-1">

                            <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-slate-900">
                              {item.title}
                            </h3>

                            <p className="mt-1 text-xs text-slate-500">
                              ${item.price.toFixed(2)} each
                            </p>

                            <div className="mt-3 flex items-center justify-between">

                              {/* Quantity */}
                              <div className="flex items-center rounded-lg border border-slate-200 bg-white">

                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-7 w-7 rounded-none text-slate-500 hover:bg-slate-100"
                                  onClick={() =>
                                    dispatch(
                                      removeFromCart(
                                        item.id
                                      )
                                    )
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={faMinus}
                                    className="text-[10px]"
                                  />
                                </Button>

                                <span className="w-7 text-center text-xs font-bold text-slate-900">
                                  {item.quantity}
                                </span>

                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-7 w-7 rounded-none text-blue-600 hover:bg-blue-50"
                                  onClick={() =>
                                    dispatch(
                                      addToCart(item)
                                    )
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={faPlus}
                                    className="text-[10px]"
                                  />
                                </Button>

                              </div>

                              {/* Item Total */}
                              <p className="text-sm font-bold text-slate-900">
                                ${itemTotal.toFixed(2)}
                              </p>

                            </div>

                          </div>

                        </div>

                      </div>
                    );
                  })}

                </div>

              )}

            </div>

            {/* Cart Footer */}
            {cartItems.length > 0 && (

              <div className="border-t border-slate-200 bg-white p-5">

                <div className="space-y-3">

                  <div className="flex items-center justify-between text-sm">

                    <span className="text-slate-500">
                      Total Items
                    </span>

                    <span className="font-semibold text-slate-900">
                      {cartCount}
                    </span>

                  </div>

                  <div className="flex items-center justify-between text-sm">

                    <span className="text-slate-500">
                      Subtotal
                    </span>

                    <span className="font-semibold text-slate-900">
                      ${grandTotal.toFixed(2)}
                    </span>

                  </div>

                </div>

                <Separator className="my-4" />

                <div className="flex items-center justify-between">

                  <span className="text-base font-bold text-slate-900">
                    Grand Total
                  </span>

                  <span className="text-2xl font-extrabold tracking-tight text-emerald-600">
                    ${grandTotal.toFixed(2)}
                  </span>

                </div>

                {/* Proceed to Checkout */}
                <Button
                  className="mt-4 w-full"
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate("/checkout");
                  }}
                >
                  Proceed to Checkout
                </Button>

              </div>

            )}

          </div>
        </div>
      )}

    </div>
  );
}

export default App;