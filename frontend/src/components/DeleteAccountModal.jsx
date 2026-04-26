import React, { useState } from 'react';
import { AlertTriangle, Trash2, X, Info } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';

const DeleteAccountModal = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    const { token, logout } = useAuth();
    const [step, setStep] = useState(1);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen) return null;

    const handleDelete = async () => {
        setIsDeleting(true);
        setError(null);
        try {
            const response = await fetch('/api/auth/account', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                logout();
                onClose();
            } else {
                const data = await response.json();
                setError(data.error || 'Erro ao excluir conta');
            }
        } catch (err) {
            setError('Erro de conexão ao tentar excluir conta' + err);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleNext = () => {
        setStep(2);
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-[#1a1a2e] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-white/10 animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-white/5">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <AlertTriangle className="text-red-500 w-5 h-5" />
                        {t('profile.delete_account.title', 'Excluir Conta')}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    {step === 1 ? (
                        <div className="space-y-4">
                            <div className="p-4 bg-red-50 dark:bg-red-500/10 rounded-xl border border-red-100 dark:border-red-500/20">
                                <p className="text-red-700 dark:text-red-400 text-sm font-medium leading-relaxed">
                                    <Info className="inline-block w-4 h-4 mr-2 mb-0.5" />
                                    {t('profile.delete_account.warning', 'Esta ação é permanente e não pode ser desfeita. Todas as suas histórias, capítulos e dados pessoais serão removidos para sempre.')}
                                </p>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                {t('profile.delete_account.info', 'Ao excluir sua conta, você perderá acesso imediato a todas as funcionalidades da NAIA.')}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4 text-center">
                            <div className="w-16 h-16 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Trash2 className="text-red-600 dark:text-red-500 w-8 h-8" />
                            </div>
                            <p className="text-gray-800 dark:text-white font-semibold">
                                {t('profile.delete_account.confirm_question', 'Você tem certeza absoluta?')}
                            </p>
                            {error && (
                                <p className="text-red-500 text-xs bg-red-50 dark:bg-red-500/10 p-2 rounded-lg border border-red-100 dark:border-red-500/20">
                                    {error}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex gap-3 p-6 bg-gray-50 dark:bg-white/5 border-t border-gray-100 dark:border-white/5">
                    <button
                        onClick={step === 1 ? onClose : handleBack}
                        className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                    >
                        {step === 1 ? t('common.cancel', 'Cancelar') : t('common.back', 'Voltar')}
                    </button>
                    {step === 1 ? (
                        <button
                            onClick={handleNext}
                            className="flex-1 px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all shadow-lg shadow-red-600/20"
                        >
                            {t('common.continue', 'Continuar')}
                        </button>
                    ) : (
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className={`flex-1 px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2 ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isDeleting ? t('common.deleting', 'Excluindo...') : (
                                <>
                                    <Trash2 size={16} />
                                    {t('profile.delete_account.confirm_button', 'Sim, Excluir Minha Conta')}
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountModal;
