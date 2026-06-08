"use client"

import useSWR from 'swr'
import type { Product } from '@/types/product'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const API_BASE = 'https://fakestoreapi.com'

export function useProducts(){
    return useSWR<Product[]>(`${API_BASE}/products`, fetcher)
}

export function useFeaturedProducts(limit = 3) {
    return useSWR<Product[]>(`${API_BASE}/products?limit=${limit}`, fetcher)
}

export function useProduct(id: string | number) {
    return useSWR<Product>(`${API_BASE}/products/${id}`, fetcher)
}