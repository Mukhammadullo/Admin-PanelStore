import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { brandAdd, getBrands } from '../../api/Api'
import { Button, Dialog, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

function Brand() {

    const dispatch = useDispatch()
    const brand = useSelector((store) => store.Reducer.brand)
    console.log(brand)

    useEffect(() => {
        dispatch(getBrands())
    }, [dispatch])

    const [brandName, setBrandName] = useState('')

    const addNewBrand = (e) => {
        e.preventDefault()
        const newBrand = new FormData()
        newBrand.append('BrandName', brandName)
        dispatch(brandAdd(newBrand))
    }

    //mui add
    const [addBrand, setAddBrand] = useState(false)

    const openAddBrand = () => {
        setAddBrand(true)
    }

    const closeAddBrand = () => {
        setAddBrand(false)
    }


    return (
        <>
            <button className='bg-[black] text-white mb-[20px] px-[10px] py-[5px] rounded-[5px]' onClick={openAddBrand}>New brand +</button>
            <div className='flex flex-wrap gap-[40px]'>
                {brand?.map((e) => {
                    return (
                        <div key={e.id} className='shadow-md rounded-[8px] bg-[#dbdbdb2f] p-[20px] flex w-[250px] flex-col items-center gap-[10px]'>
                            <h1>Brand: {e.brandName}</h1>
                            <h1>ID: {e.id}</h1>
                        </div>
                    )
                })}
            </div>


            {/* add */}
            <Dialog
                open={addBrand}
            >

                <>
                    <div className='p-[30px]'>
                        <div className='flex justify-between mb-[20px]'>
                            <h1>New Brand</h1>
                            <CloseIcon onClick={closeAddBrand} />
                        </div>
                        <form action="" onSubmit={addNewBrand} className='flex flex-col gap-[10px]'>
                            <TextField  onChange={(e) => setBrandName(e.target.value)} />
                            <Button type='submit' onClick={closeAddBrand} sx={{ border: '1px solid' }}>Save</Button>
                        </form>
                    </div>
                </>

            </Dialog>
        </>
    )
}

export default Brand