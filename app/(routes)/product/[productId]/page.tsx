import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

export const revalidate = 0;

interface ProductPageProps {
  params: {
    productId: string;
  }
}

const ProductPage: React.FC<ProductPageProps> = async ({
  params
}) => {
  const product = await getProduct(params.productId)
  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id
  })

  if (!product) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="sm:grid sm:grid-cols-2 lg:items-start sm:gap-x-8">
            {/* Gallery */}
            <Gallery images={product.images}/>
            {/* Info */}
            <Info data={product}/>
          </div>
          <hr className="my-10"/>
          <ProductList title="Related Items" items={suggestedProducts}/>
        </div>
      </Container>
    </div>
  );
}

export default ProductPage;