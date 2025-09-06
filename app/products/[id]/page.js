import ProductDetail from "../../components/ProductDetail"; // adjust path if needed

export default function ProductPage({ params }) {
  const { id } = params; // this comes from the URL
  return <ProductDetail productId={id} />;
}
