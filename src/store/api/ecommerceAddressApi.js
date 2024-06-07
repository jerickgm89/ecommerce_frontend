import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseURl = import.meta.env.VITE_BASE_URL;
export const ecommerceAddressApi = createApi({
    reducerPath: 'ecommerceAddressApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:3001',
    }),
    tagTypes: ['Address'],
    endpoints: (builder) => ({

        // CRUD ADDRESS
        // Get all address
        getAddresses: builder.query({
            query: () => '/address',
            providesTags: ['Address'],
        }),
         // Get address by id
         getAddressById: builder.query({
            query: (id)  => `/address/${id}`,
            providesTags: (result, error, id) => [{ type: 'Address', id }],
        }),
        // Get address by user
        getAddressByUser: builder.query({
            query: (idUser) => `/address/user/${idUser}`,
        }),
        // Post Create address
        postCreateAddress: builder.mutation({
            query: ({ idUser, ...newAddress }) => ({
                url: `/address/${idUser}`,
                method: 'POST',
                body: newAddress
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Address', id }],
        }),
        // Update address
        putUpdateAddress: builder.mutation({
            query: ({ id, ...fields }) => ({
                url: `/address/${id}`,
                method: 'PUT',
                body: fields,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Address', id }],
          }),
        // Delete address
        deleteAddress: builder.mutation({
            query: (id) => ({
                url: `/address/idAddress/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Address', id }],
        }),
        getProvince: builder.query({
            query: () => '/address',
        }),
        getDepartments: builder.query({
            query: (province) => `/address?province=${province}`,
        }),
        getPostalCodes: builder.query({
			query: ({ department, province }) => {
				const queryUrl = `/address?department=${department}&province=${province}`;
				console.log('provincias:', { province, department });
				return queryUrl;
			},
		}),
        getShippingPrice: builder.query({
			query: (postalCode) => `/address/postal/${postalCode}`,
		}),
    }),
});

export const { 
    useGetAddressesQuery, 
    useGetAddressByIdQuery, 
    useGetAddressByUserQuery, 
    usePostCreateAddressMutation, 
    usePutUpdateAddressMutation, 
    useDeleteAddressMutation,
    useGetProvinceQuery,
    useGetDepartmentsQuery,
    useGetPostalCodesQuery,
    useGetShippingPriceQuery
} = ecommerceAddressApi;
