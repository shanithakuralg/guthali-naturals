'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2, ImageIcon } from 'lucide-react';

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    folder?: string;
    disabled?: boolean;
    label?: string;
}

export default function ImageUpload({
    value,
    onChange,
    folder = 'guthali-products',
    disabled = false,
    label = 'Upload Image',
}: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [dragOver, setDragOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (file: File) => {
        setError('');
        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('folder', folder);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Upload failed');
            }

            onChange(data.url);
        } catch (err: any) {
            setError(err.message || 'Upload failed. Try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleUpload(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleUpload(file);
    };

    const handleRemove = () => {
        onChange('');
        if (inputRef.current) inputRef.current.value = '';
    };

    return (
        <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">{label}</label>

            {/* Preview */}
            {value && (
                <div className="relative w-full h-52 rounded-xl overflow-hidden border border-gray-200 group">
                    <Image
                        src={value}
                        alt="Preview"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 400px"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                            type="button"
                            onClick={handleRemove}
                            disabled={disabled}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>
            )}

            {/* Upload Area */}
            {!value && (
                <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => !disabled && inputRef.current?.click()}
                    className={`
            w-full border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all text-center
            ${dragOver ? 'border-brand-green bg-brand-cream/50 scale-[1.01]' : 'border-gray-300 hover:border-brand-green hover:bg-gray-50'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
                >
                    {uploading ? (
                        <div className="flex flex-col items-center">
                            <Loader2 className="w-10 h-10 text-brand-green animate-spin mb-2" />
                            <p className="text-sm text-gray-600 font-medium">Uploading to Cloudinary...</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <div className="w-14 h-14 rounded-full bg-brand-cream flex items-center justify-center mb-3">
                                {dragOver ? (
                                    <ImageIcon className="w-7 h-7 text-brand-green" />
                                ) : (
                                    <Upload className="w-7 h-7 text-brand-green" />
                                )}
                            </div>
                            <p className="text-sm font-semibold text-gray-700 mb-1">
                                {dragOver ? 'Drop image here' : 'Click to upload or drag & drop'}
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG, WebP • Max 10MB</p>
                        </div>
                    )}
                </div>
            )}

            {/* Already has image - show replace button */}
            {value && (
                <button
                    type="button"
                    onClick={() => !disabled && inputRef.current?.click()}
                    disabled={disabled || uploading}
                    className="w-full py-2 text-sm text-brand-green border border-brand-green/30 rounded-lg hover:bg-brand-cream/50 transition-colors disabled:opacity-50"
                >
                    {uploading ? (
                        <span className="flex items-center justify-center gap-2">
                            <Loader2 size={14} className="animate-spin" />
                            Uploading...
                        </span>
                    ) : (
                        'Replace Image'
                    )}
                </button>
            )}

            {/* Error */}
            {error && (
                <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}

            {/* Hidden input */}
            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
                disabled={disabled}
            />
        </div>
    );
}
