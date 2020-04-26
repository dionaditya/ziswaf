import { singleton } from 'tsyringe';
import { AxiosResponse } from "axios"
import { Category, SubCategory, StatementCategory } from '@/domain/entities/Category';

@singleton()
export class CategoryMapper {
    public convertCategoryListFromApi(result: AxiosResponse<any>): Category[] {
        const response = Array<Category>();
        const aResp = result.data;
        aResp.data.forEach((item: any) => {
            var category = new Category(
                item.id,
                item.name,
                item.description,
                item.status
            );

            var subCategories = Array<SubCategory>();
            item.statement_categories.forEach((sub: any) => {
                subCategories.push(new SubCategory(
                    sub.id,
                    sub.name
                ));
            })

            category.subCategories = subCategories;
            response.push(category);
        });

        return response;
    }

    public convertCategoryOperatorListFromApi(result: AxiosResponse<any>): Category[] {
        const response = Array<Category>();
        const aResp = result.data;
        aResp.data.forEach((item: any) => {
            var category = new Category(
                item.id,
                item.name,
                item.description,
                item.status
            );

            var subCategories = Array<SubCategory>();
            item.statement_categories.forEach((sub: any) => {
                subCategories.push(new SubCategory(
                    sub.id,
                    sub.name
                ));
            })

            category.subCategories = subCategories;
            response.push(category);
        });

        return response;
    }

    public convertStatementCategoriesFromApi(result: AxiosResponse<any>): StatementCategory[] {
        const response = Array<StatementCategory>();
        const aResp = result.data;
        aResp.data.forEach((item: any) => {
            var category = new StatementCategory(
                item.id,
                item.statement_category,
            );
            response.push(category);
        });

        return response;
    }

    public convertCategoryFromApi(result: AxiosResponse<any>): Category {
        const item = result.data;
        var category = new Category(
            item.id,
            item.name,
            item.description,
            item.status
        );
        
        var subCategories = Array<SubCategory>();
        item.statement_categories.forEach((sub: any) => {
            subCategories.push(new SubCategory(
                sub.id,
                sub.name
            ));
        })
        category.subCategories = subCategories;
        return category;
    }
}