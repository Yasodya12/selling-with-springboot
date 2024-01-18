import {useSelector} from "react-redux";
import React from "react";
import {Navigate, Outlet } from "react-router-dom";

export function PrivateRoute() {
    // @ts-ignore
    const { currentUser } = useSelector((state) => state.user);
    return currentUser ? <Outlet /> : <Navigate to='/sign-in' />;
}