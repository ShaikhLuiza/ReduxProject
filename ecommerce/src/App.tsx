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

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />

          <p className="text-sm font-medium text-slate-600">
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <span className="text-xl font-bold text-red-600">
                !
              </span>
            </div>

            <h2 className="text-lg font-semibold text-slate-900">
              Something went wrong
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              We couldn't load the products. Please try again.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="sticky top-0 z-20 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">

          <div>
            <h1 className="text-3xl font-bold leading-none tracking-tight text-blue-900">
              ShopStore
            </h1>

            <p className="mt-0.5 hidden text-[11px] text-slate-500 sm:block">
              Discover products
            </p>
          </div>

          {/* Cart Button */}
          <Button
            variant="outline"
            size="sm"
            className="relative h-9 px-3"
            onClick={() => setIsCartOpen(true)}
          >
            <FontAwesomeIcon
              icon={faCartShopping}
              className="text-sm"
            />

            <span className="ml-2">
              Cart
            </span>

            {cartCount > 0 && (
              <Badge
                className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] text-white hover:bg-red-500"
              >
                {cartCount}
              </Badge>
            )}
          </Button>
        </div>
      </header>

      {/* Products */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">

        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Products
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {products?.length ?? 0} products available
            </p>
          </div>
        </div>

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
                className={`group overflow-hidden bg-white transition-all duration-300 ${
                  isSelected
                    ? "border-primary shadow-xl ring-2 ring-primary/20"
                    : "border-slate-200 hover:-translate-y-1 hover:shadow-lg"
                }`}
              >

                {/* Product Image */}
                <div className="relative flex h-52 items-center justify-center overflow-hidden bg-slate-100 p-5">

                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className={`h-full w-full object-contain transition-transform duration-300 ${
                      isSelected
                        ? "scale-105"
                        : "group-hover:scale-110"
                    }`}
                  />

                  <Badge className="absolute left-3 top-3 bg-white text-slate-700 shadow-sm hover:bg-white">
                    #{product.id}
                  </Badge>

                  {isSelected && (
                    <Badge className="absolute right-3 top-3 bg-primary text-primary-foreground">
                      Selected
                    </Badge>
                  )}

                  {/* Quantity Badge */}
                  {cartItem && cartItem.quantity > 0 && (
                    <Badge className="absolute bottom-3 right-3 bg-emerald-600 text-white hover:bg-emerald-600">
                      In Cart: {cartItem.quantity}
                    </Badge>
                  )}
                </div>

                {/* Product Header */}
                <CardHeader className="pb-2">
                  <CardTitle className="line-clamp-2 min-h-12 text-base font-semibold">
                    {product.title}
                  </CardTitle>
                </CardHeader>

                {/* Product Content */}
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-emerald-600">
                      ${product.price.toFixed(2)}
                    </p>

                    <Badge variant="secondary">
                      In Stock
                    </Badge>
                  </div>

                  {/* Product Details */}
                  {isSelected && (
                    <div className="mt-4 rounded-xl border bg-slate-50 p-4">

                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="font-semibold text-slate-900">
                          Product Details
                        </h3>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            dispatch(showDetails(null))
                          }
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </Button>
                      </div>

                      <Separator className="mb-4" />

                      <div className="space-y-3 text-sm">

                        <div className="flex justify-between">
                          <span className="text-slate-500">
                            Product ID
                          </span>

                          <span className="font-medium text-slate-900">
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

                          <span className="font-medium text-green-600">
                            Available
                          </span>
                        </div>

                      </div>

                      <Button
                        className="mt-4 w-full"
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
                <CardFooter className="flex gap-2 pt-0">

                  <Button
                    variant={
                      isSelected
                        ? "secondary"
                        : "outline"
                    }
                    className="flex-1"
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

                  {/* Decrease Quantity */}
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() =>
                      dispatch(
                        removeFromCart(product.id)
                      )
                    }
                  >
                    <FontAwesomeIcon
                      icon={faMinus}
                    />
                  </Button>

                  {/* Increase Quantity */}
                  <Button
                    size="icon"
                    onClick={() =>
                      dispatch(
                        addToCart(product)
                      )
                    }
                  >
                    <FontAwesomeIcon
                      icon={faPlus}
                    />
                  </Button>

                </CardFooter>
              </Card>
            );
          })}
        </div>

        {!products?.length && (
          <div className="flex flex-col items-center justify-center py-20 text-center">

            <FontAwesomeIcon
              icon={faBoxOpen}
              className="mb-4 text-4xl text-slate-300"
            />

            <h3 className="text-lg font-semibold text-slate-900">
              No products found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              There are no products available right now.
            </p>

          </div>
        )}
      </main>

      {/* ================= CART DRAWER ================= */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">

          {/* Background Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">

            {/* Cart Header */}
            <div className="flex items-center justify-between border-b px-5 py-4">

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Shopping Cart
                </h2>

                <p className="text-sm text-slate-500">
                  {cartCount}{" "}
                  {cartCount === 1 ? "item" : "items"}
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(false)}
              >
                <FontAwesomeIcon icon={faXmark} />
              </Button>

            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-5">

              {cartItems.length === 0 ? (

                <div className="flex h-full flex-col items-center justify-center text-center">

                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className="mb-4 text-5xl text-slate-300"
                  />

                  <h3 className="text-lg font-semibold text-slate-900">
                    Your cart is empty
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Add some products to your cart.
                  </p>

                </div>

              ) : (

                <div className="space-y-4">

                  {cartItems.map((item) => {

                    const itemTotal =
                      item.price * item.quantity;

                    return (
                      <div
                        key={item.id}
                        className="rounded-xl border border-slate-200 p-4"
                      >

                        <div className="flex gap-4">

                          {/* Image */}
                          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-slate-100 p-2">

                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="h-full w-full object-contain"
                            />

                          </div>

                          {/* Information */}
                          <div className="min-w-0 flex-1">

                            <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
                              {item.title}
                            </h3>

                            <p className="mt-1 text-sm text-emerald-600">
                              ${item.price.toFixed(2)} each
                            </p>

                            <div className="mt-3 flex items-center justify-between">

                              {/* Quantity Controls */}
                              <div className="flex items-center gap-2">

                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-7 w-7"
                                  onClick={() =>
                                    dispatch(
                                      removeFromCart(item.id)
                                    )
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={faMinus}
                                    className="text-xs"
                                  />
                                </Button>

                                <span className="w-6 text-center text-sm font-semibold">
                                  {item.quantity}
                                </span>

                                <Button
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() =>
                                    dispatch(
                                      addToCart(item)
                                    )
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={faPlus}
                                    className="text-xs"
                                  />
                                </Button>

                              </div>

                              {/* Item Total */}
                              <p className="font-bold text-slate-900">
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

              <div className="border-t bg-slate-50 p-5">

                <div className="mb-3 flex items-center justify-between text-sm">

                  <span className="text-slate-500">
                    Total Items
                  </span>

                  <span className="font-medium text-slate-900">
                    {cartCount}
                  </span>

                </div>

                <Separator className="mb-4" />

                <div className="flex items-center justify-between">

                  <span className="text-lg font-semibold text-slate-900">
                    Grand Total
                  </span>

                  <span className="text-2xl font-bold text-emerald-600">
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