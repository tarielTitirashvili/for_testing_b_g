import { useEffect, useState, type FunctionComponent } from "react"
import { useNavigate, useParams } from "react-router-dom";

import { Tabs } from "@/components/ui/tabs";

import { api } from "@/api/api";

import BusinessHeader from "@/components/shared/serviceAndCategory/BusinessHeader";
import BusinessServiceBody from "@/components/shared/serviceAndCategory/BusinessServiceBody";
import AddCategory from "@/pages/business/services/components/AddCategory";
import AddService from "@/pages/business/services/components/AddService";

export interface IService {
    id: number,
    price: number,
    durationInMinutes: number,
    hasAssignedStaff: boolean,
    name: string
    files: {
        id: number,
        url: string,
        isProfile: boolean
    }[]
}

export interface ICategory {
    isSystem: boolean
    id: string
    name: string
}


const Menu: FunctionComponent = () => {
    const [categories, setCategories] = useState<ICategory[]>([])
    const [services, setServices] = useState<IService[]>([])
    const { id } = useParams()
    const navigate = useNavigate()

    const fetchCategories = async () => {
        try {
            const res = await api.get('category')
            const result = res.data
            setCategories(result)
        } catch (err) {
            console.log(err)
        }
    }

    const fetchServices = async (id: string) => {
        try {
            const res = await api.get(`categoryservices/services/${id}`)
            const result = res.data
            setServices(result)
        } catch (err) {
            console.log(err)
        }
    }

    const removeCategory = async (id: string) => {
        try {
            await api.delete(`/category`, {
                data: [id]
            })
            console.log(`removed: ${id}`)
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        fetchCategories()
        fetchServices(id?.toString()!)
    }, [id])

    return (
        <div className="bg-white p-6 rounded-sm">
            <Tabs
                value={id}
                defaultValue={categories[0]?.id.toString()}
                onValueChange={(tabValue) => navigate(`/menu/${tabValue}`)}
            >
                <BusinessHeader
                    serviceCategories={categories}
                    AddItemComponent={AddService}
                    removeCategory={removeCategory}
                    // EditComponent={AddCategory}
                    AddCategoryComponent={AddCategory}
                    // isEditable
                />
                
                <BusinessServiceBody categories={categories} categoryId={String(id)} services={services}  />
            </Tabs>
        </div>
    )
}

export default Menu