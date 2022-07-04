import React from "react";

var redirect = false;

function getRedirect(value)
{
    redirect = value;
}

export {redirect, getRedirect}