import { Key } from "react"

export type User = {
    _id: Key,
    email: string,
    name: string,
    surname: string,
    city: string,
    dateOfBirth: string
}