import { adminApi } from "./adminApi";


const offerApi = adminApi.injectEndpoints({
    endpoints:(builder)=>({
        getOffers:builder.query({
            query:()=>({
                url:'admin/offers',
                method:"GET"
            }),
            providesTags:['Offers']
        }),
        getAllCategoryProductNames:builder.query({
            query:()=>({
                url:'admin/offers/categoryProducts',
                method:"GET"
            })
        })
        
    })
})

export const {useGetOffersQuery,useGetAllCategoryProductNamesQuery} = offerApi