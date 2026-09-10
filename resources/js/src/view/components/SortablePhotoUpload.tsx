import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState, type ChangeEvent, type DragEvent } from "react";
import vehiclesAction from "../../store/actions/vehicles.action";
import { useAppDispatch } from "../../store/hooks";

export interface SortablePhoto {
    id: number;
    src: string;
    name?: string;
}

type SortablePhotoItemProps = {
    photo: SortablePhoto;
    index: number;
    onDelete: (photoId: number) => void;
    onDrop: (index: number) => void;
};

const SortablePhotoItem = ({ photo, index, onDelete, onDrop }: SortablePhotoItemProps) => {
    const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", String(index));
    };

    return (
        <Box
            draggable
            onDragStart={handleDragStart}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
                event.preventDefault();
                onDrop(index);
            }}
            role="listitem"
            tabIndex={0}
            aria-label={`Foto ${index + 1}. Arraste para reordenar.`}
            sx={{
                position: "relative",
                width: "100%",
                aspectRatio: "4 / 3",
                border: "1px solid #cbd5e1",
                borderRadius: 1,
                overflow: "hidden",
                background: "#e2e8f0",
                cursor: "grab",
                "&:active": { cursor: "grabbing" },
            }}
        >
            <Box
                component="img"
                src={photo.src}
                alt={photo.name ?? "Foto do veículo"}
                sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <Button
                type="button"
                size="small"
                aria-label="Excluir foto"
                onClick={(event) => {
                    event.stopPropagation();
                    onDelete(photo.id);
                }}
                sx={{
                    position: "absolute",
                    top: 2,
                    right: 2,
                    p: 0.35,
                    minWidth: 0,
                    lineHeight: 1,
                    color: "white",
                    backgroundColor: "rgba(15, 23, 42, 0.7)",
                    "&:hover": { backgroundColor: "rgba(15, 23, 42, 0.9)" },
                }}
            >
                X
            </Button>
            <Typography component="span" sx={{ position: "absolute", left: 3, bottom: 2, color: "white", fontWeight: 700 }}>
                ::
            </Typography>
        </Box>
    );
};

type SortablePhotoUploadProps = {
    photos: SortablePhoto[];
    vehicleId?: number;
    disabled?: boolean;
};

export default function SortablePhotoUpload({ photos, vehicleId, disabled = false }: SortablePhotoUploadProps) {
    const dispatch = useAppDispatch();
    const [orderedPhotos, setOrderedPhotos] = useState(photos);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    useEffect(() => {
        setOrderedPhotos(photos);
    }, [photos]);

    const handleUploadPhoto = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!vehicleId || !files || files.length === 0) {
            return;
        }

        try {
            for (const file of Array.from(files)) {
                await dispatch(vehiclesAction.uploadVehiclePhoto(vehicleId, file) as any);
            }
        } catch (uploadError) {
            console.error("Erro ao enviar fotos:", uploadError);
        } finally {
            event.target.value = "";
        }
    };

    const handleDeletePhoto = async (photoId: number) => {
        const previousPhotos = orderedPhotos;
        setOrderedPhotos((currentPhotos) => currentPhotos.filter((photo) => photo.id !== photoId));

        try {
            await dispatch(vehiclesAction.deleteVehiclePhoto(photoId) as any);
        } catch (deleteError) {
            setOrderedPhotos(previousPhotos);
            console.error("Erro ao excluir foto:", deleteError);
        }
    };

    const handleReorderPhotos = async (photoIds: number[]) => {
        if (!vehicleId) {
            return;
        }

        try {
            await dispatch(vehiclesAction.reorderVehiclePhotos(vehicleId, photoIds) as any);
        } catch (reorderError) {
            console.error("Erro ao reordenar fotos:", reorderError);
        }
    };

    const handleDrop = (newIndex: number) => {
        if (draggedIndex === null || draggedIndex === newIndex) {
            setDraggedIndex(null);
            return;
        }

        const nextPhotos = [...orderedPhotos];
        const [movedPhoto] = nextPhotos.splice(draggedIndex, 1);
        nextPhotos.splice(newIndex, 0, movedPhoto);
        setOrderedPhotos(nextPhotos);
        void handleReorderPhotos(nextPhotos.map((photo) => photo.id));
        setDraggedIndex(null);
    };

    return (
        <Box
            role="list"
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(112px, 1fr))",
                gap: 1,
                alignItems: "stretch",
            }}
        >
            {orderedPhotos.map((photo, index) => (
                <Box key={photo.id} onDragStart={() => setDraggedIndex(index)} sx={{ minWidth: 0 }}>
                    <SortablePhotoItem photo={photo} index={index} onDelete={handleDeletePhoto} onDrop={handleDrop} />
                </Box>
            ))}
            <Button component="label" variant="outlined" disabled={!vehicleId || disabled} sx={{ minHeight: 88, borderStyle: "dashed" }}>
                Adicionar fotos
                <input hidden type="file" accept="image/*" multiple onChange={handleUploadPhoto} />
            </Button>
            {orderedPhotos.length === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ width: "100%" }}>
                    Nenhuma foto adicionada.
                </Typography>
            )}
        </Box>
    );
}
