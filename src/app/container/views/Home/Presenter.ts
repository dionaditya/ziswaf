import { injectable } from "tsyringe";
// import { Book } from "@/domain/entities/Home";
// import { HomeRepositoryInterface } from "@/data/persistences/contracts/HomeRepositoryInterface";
// import {
//   CreateHomeRequest,
//   UpdateHomeRequest
// } from "@/data/payload/api/HomeApiRequest";
// @injectable()
// export class HomePresenter {
//   private repository: HomeRepositoryInterface;

//   constructor(repository: HomeRepositoryInterface) {
//     this.repository = repository;
//   }

//   public loadData(params: Map<string, string>): Promise<Book[]> {
//     return this.repository.loadData(params);
//   }

//   public postData(payload: CreateHomeRequest): Promise<Book[]> {
//     return this.repository.postData(payload);
//   }

//   public updateData(payload: UpdateHomeRequest, id: number): Promise<Book[]> {
//     return this.repository.updateData(payload, id);
//   }

//   public deleteData(id: number): Promise<Book[]> {
//     return this.repository.deleteData(id);
//   }
// }
