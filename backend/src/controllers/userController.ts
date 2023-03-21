import express, { Request, Response } from 'express'
import { Body } from 'node-fetch';
import User from "../models/UserModel";
import mongoose from 'mongoose';


const basePrice = [
    {
        amount: 1000,
        city: "Zagreb"
    },
    {
        amount: 950,
        city: "Split"
    },
    {
        amount: 900,
        city: "Rijeka"
    },
    {
        amount: 900,
        city: "Osijek"
    },
    {
        amount: 800,
        city: "Zadar"
    },
    {
        amount: 700,
        city: "other"
    }
]

const discount = [
    {
        discount: 20,
        age: "0-20"
    },
    {
        discount: 10,
        age: "20-30"
    },
    {
        discount: 5,
        age: "30-40"
    },
    {
        discount: 2,
        age: "40-60"
    },
    {
        discount: 0,
        age: "60-200"
    }
]

// get all users

export const getUsers = async (req: Request, res: Response) => {
    const users = await User.find({})

    res.status(200).json(users)
}


//get single user

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No user with matching ID found!' })
    }

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({ error: 'No user with matching ID found!' })
    }
    res.status(200).json(user)
}

//get user insurance

export const getUserInsurance = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No user with matching ID found!' })
    }
    
    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({ error: 'No user with matching ID found!' })
    }

    let amount: number;
    let base = basePrice.find(el => el.city.toLowerCase() == user.city);

    if (!base){
        base = basePrice.find(el => el.city.toLowerCase() == 'other')
    }

    const disc = discount.find(el => {
        const range = el.age.split('-')
        const dob = new Date(user.dateOfBirth)
        const age = ~~((Date.now() - dob.getTime()) / (31557600000))
        if (age >= +range[0] && age < +range[1] ){
            return(el)
        }
    });

    amount = base!.amount;

    const final = amount-(amount*(disc!.discount/100))


    res.status(200).json(final)
}

//create new user
export const createUser = async (req: Request, res: Response) => {
    const { email, name, surname, city, dateOfBirth } = req.body
    try {
        const user = await User.create({ email, name, surname, city, dateOfBirth })
        res.status(200).json(user)
        return null;
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message })
        }
        return null;
    }
}

//delete user

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No user with matching ID found!' })
    }

    const user = await User.findOneAndDelete({ _id: id })

    if (!user) {
        return res.status(404).json({ error: 'No user with matching ID found!' })
    }

    res.status(200).json({ user })
}

//update user

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No user with matching ID found!' })
    }

    const user = await User.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!user) {
        return res.status(404).json({ error: 'No user with matching ID found!' })
    }

    res.status(200).json(user)
}


