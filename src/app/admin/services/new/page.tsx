import React from "react";
import ServiceForm from "@/components/admin/ServiceForm";

export default function NewServicePage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Nuevo Servicio</h1>
                <p className="text-gray-400 mt-1">
                    Crea un nuevo servicio para ofrecer a los clientes
                </p>
            </div>

            <ServiceForm />
        </div>
    );
}
