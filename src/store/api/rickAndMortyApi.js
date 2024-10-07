import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rickAndMortyApi = createApi({
  reducerPath: "rickAndMortyApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://rickandmortyapi.com/api" }),
  endpoints: (builder) => ({
    getCharacters: builder.query({
      query: ({
        name = "",
        species = "",
        gender = "",
        status = "",
        page = 1,
      }) => {
        const params = new URLSearchParams({
          name,
          species,
          gender,
          status,
          page,
        });
        return `/character/?${params}`;
      },
    }),
  }),
});

export const { useGetCharactersQuery } = rickAndMortyApi;
