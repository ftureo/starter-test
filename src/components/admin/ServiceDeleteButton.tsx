"use client";

import React, { useState, useTransition } from "react";
import { deleteService, restoreService } from "@/actions/service.actions";
import { useRouter } from "next/navigation";

interface ServiceDeleteButtonProps {
    serviceId: string;
    serviceTitle: string;
    isActive: boolean;
}

export default function ServiceDeleteButton({ 
    serviceId, 
    serviceTitle,
    isActive 
}: ServiceDeleteButtonProps) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleDelete = () => {
        startTransition(async () => {
            const result = await deleteService(serviceId);
            if (result.success) {
                setShowConfirm(false);
                router.refresh();
            } else {
                alert(result.error);
            }
        });
    };

    const handleRestore = () => {
        startTransition(async () => {
            const result = await restoreService(serviceId);
            if (result.success) {
                router.refresh();
            } else {
                alert(result.error);
            }
        });
    };

    if (!isActive) {
        return (
            <button
                onClick={handleRestore}
                disabled={isPending}
                className="rounded-lg p-2 text-green-400 hover:bg-gray-700 hover:text-green-300 transition-colors disabled:opacity-50"
                title="Restaurar"
            >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            </button>
        );
    }

    return (
        <>
            <button
                onClick={() => setShowConfirm(true)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-700 hover:text-red-400 transition-colors"
                title="Eliminar"
            >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>

            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold text-white mb-2">
                            ¿Eliminar servicio?
                        </h3>
                        <p className="text-gray-400 mb-4">
                            ¿Estás seguro de que deseas eliminar &ldquo;{serviceTitle}&rdquo;? 
                            El servicio será desactivado y podrás restaurarlo más tarde.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                disabled={isPending}
                                className="px-4 py-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isPending}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                            >
                                {isPending ? 'Eliminando...' : 'Eliminar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
