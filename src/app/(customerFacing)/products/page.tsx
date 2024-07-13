import { Suspense } from 'react'

import db from '@/db/db'
import { ProductCard, ProductCardSkeleton } from '@/components/ProductCard'

const getProducts = () => {
	return db.product.findMany({
		where: { isAvailableForPurchase: true },
		orderBy: { name: 'asc' },
	})
}

export default function Products() {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
			<Suspense
				fallback={
					<>
						<ProductCardSkeleton />
						<ProductCardSkeleton />
						<ProductCardSkeleton />
						<ProductCardSkeleton />
						<ProductCardSkeleton />
						<ProductCardSkeleton />
					</>
				}
			>
				<ProductsSuspense />
			</Suspense>
		</div>
	)
}

async function ProductsSuspense() {
	const products = await getProducts()

	return products.map((product) => (
		<ProductCard key={product.id} {...product} />
	))
}
