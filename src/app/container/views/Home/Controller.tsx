import React, { useEffect, useState } from "react";
import { container } from "tsyringe";
// import { Book } from "@/domain/entities/Home";
// import { HomePresenter } from "./Presenter";
// import { CreateHomeRequest, UpdateHomeRequest } from "@/data/payload/api/HomeApiRequest";

// interface InitialState {
//   data: Book[];
//   loading: Boolean;
//   _onPost: Function;
//   _onUpdate: Function;
//   _onDelete: Function;
// }

// const initialState = {
//   data: [],
//   loading: false,
//   _onPost: () => { },
//   _onUpdate: () => { },
//   _onDelete: () => { }
// };

// export const HomeContext = React.createContext<InitialState>(initialState);

// export const { Provider: HomeProvider, Consumer: HomeConsumer } = HomeContext;

// export const HomeController = ({ children }) => {
//   const [data, setData] = useState<Book[]>([]);
//   const [loading, setLoading] = useState<Boolean>(false);
//   const homePresenter: HomePresenter = container.resolve(HomePresenter);

//   useEffect(() => {
//     onGetData();
//   }, []);

//   const onGetData = async () => {
//     setLoading(true);
//     const homeData = await homePresenter.loadData(new Map<string, string>());
//     setData(homeData);
//     setLoading(false);
//   };

//   const _postData = async (params: CreateHomeRequest) => {
//     setLoading(true);
//     await homePresenter.postData(params);
//     onGetData();
//   };

//   const _updateData = async (params: UpdateHomeRequest, id: number) => {
//     setLoading(true);
//     await homePresenter.updateData(params, id);
//     onGetData();
//   };

//   const _deleteData = async (id: number) => {
//     setLoading(true);
//     await homePresenter.deleteData(id);
//     onGetData();
//   };

//   return (
//     <HomeProvider value={{ data, loading, _onPost: _postData, _onUpdate: _updateData, _onDelete: _deleteData }}>
//       {children}
//     </HomeProvider>
//   );
// };
