import React from "react";
import { useForm } from "react-hook-form";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <section className="inset-0 fixed bg-white ">
      <input className="p-2 border-purple-700 border " type="password" />
      <input className="p-2 border-purple-700 border " type="password" />
      <input className="p-2 border-purple-700 border " type="password" />
    </section>
  );
};

export default ChangePassword;
