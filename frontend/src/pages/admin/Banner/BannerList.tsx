import { useEffect, useState } from "react";

import AdminLayout from "../../../layouts/AdminLayout";

import BannerTable from "../../../components/admin/banner/BannerTable";

import { getAllBanners,deleteBanner,toggleBannerStatus } from "../../../services/bannerService";

import type { Banner } from "../../../types/banner";
import EmptyBanner from "../../../components/admin/banner/EmptyBanner";
import BannerToolbar from "../../../components/admin/banner/BannerToolbar";
import Swal from "sweetalert2";

export default function BannerList() {

  const [banners, setBanners] = useState<Banner[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const ITEMS_PER_PAGE=5;

const[currentPage,setCurrentPage]=useState(1);

const filteredBanners=banners.filter((banner)=>{

const keyword=search.toLowerCase();

return(

banner.title.toLowerCase().includes(keyword)

||

banner.subtitle.toLowerCase().includes(keyword)

||

banner.description.toLowerCase().includes(keyword)

);

});

const totalPages=Math.ceil(

filteredBanners.length/

ITEMS_PER_PAGE

);

const start=(currentPage-1)*ITEMS_PER_PAGE;

const end=start+ITEMS_PER_PAGE;

const paginatedBanners=

filteredBanners.slice(start,end);

  const loadData = async () => {

setLoading(true);

const data = await getAllBanners();

setBanners(data.banners);

setLoading(false);

};

  useEffect(() => {

    loadData();

  }, []);

  const handleDelete = async (
id:string
)=>{

const result=await Swal.fire({

title:"Delete Banner?",

text:"This action cannot be undone.",

icon:"warning",

showCancelButton:true,

confirmButtonColor:"#dc2626",

confirmButtonText:"Delete",

});

if(!result.isConfirmed)return;

await deleteBanner(id);

await loadData();

Swal.fire(

"Deleted",

"Banner deleted successfully",

"success"

);

};
const handleToggle=async(
id:string
)=>{

await toggleBannerStatus(id);

loadData();

};
if (loading) {

return (

<AdminLayout>

<div className="text-center mt-20">

Loading banners...

</div>

</AdminLayout>

);

}
  return (

    <AdminLayout>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">

          Banner Management

        </h1>

      </div>
        <BannerToolbar
    search={search}
    setSearch={setSearch}
/>

{
    filteredBanners.length === 0 ? (
        <EmptyBanner />
    ) : (
       <BannerTable

banners={paginatedBanners}

onDelete={handleDelete}

onToggle={handleToggle}

/>
    )
}
      
<div className="flex justify-end mt-6 gap-2">

{

Array.from({

length:totalPages

}).map((_,index)=>(

<button

key={index}

onClick={()=>setCurrentPage(index+1)}

className={`px-4 py-2 rounded

${

currentPage===index+1

?"bg-blue-600 text-white"

:"bg-white"

}`}

>

{index+1}

</button>

))

}

</div>
    </AdminLayout>

  );
}