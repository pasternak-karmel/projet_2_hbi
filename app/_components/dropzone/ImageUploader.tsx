import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

export default function ImageUploader() {
  const { setValue } = useFormContext();

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      const file = acceptedFiles[0];
      setValue("image", file);
    },
    [setValue]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    // accept: "image/*",
  });

  return (
    <div {...getRootProps()} className=" border-2 border-dashed p-4 text-center">
      <input {...getInputProps()} />
      <p>Glisse et dépose la photo de ton article ici ou clique pour selectionnez </p>
    </div>
  );
}
