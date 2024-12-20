import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import 'react-quill/dist/quill.snow.css'; // Import React Quill styles
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';

export default function UpdateNews() {
    const { id } = useParams();
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const [Newsname, setname] = useState([]);
    const [des, setdes] = useState();
    const [category, setcat] = useState();
    const [image, setimage] = useState();

    const navigate = useNavigate();

    const handleUploadImage = () => {
        try {
            if (!file) {
                setImageUploadError('Please select an image');
                return;
            }
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError("Image upload failed");
                    console.error("Upload error:", error);
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({ ...formData, Picture: downloadURL });
                        setimage(downloadURL);
                    });
                }
            );
        } catch (error) {
            setImageUploadError('Failed to upload image');
            setImageUploadProgress(null);
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchevent = async () => {
            try {
                const res = await fetch(`/api/news/getnews/${id}`);
                const data = await res.json();
                if (res.ok) {
                    setname(data.Newsname);
                    setcat(data.category); 
                    setdes(data.descreption);
                    setimage(data.Picture);
                    setFormData({
                        Newsname: data.Newsname,
                        category: data.category,
                        descreption: data.descreption,
                        Picture: data.Picture,
                    });
                } else {
                    console.log("Error fetching news:", data.message);
                }
            } catch (error) {
                console.log("Fetch error:", error.message);
            }
        };

        fetchevent();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Submitting Update Request:", formData);
    
            const res = await fetch(`/api/news/updatenews/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
    
            if (!res.ok) {
                console.error("Update Error:", data.message);
                setPublishError(data.message);
                return;
            }
    
            setPublishError(null);
            navigate('/dashboard?tab=news');
        } catch (error) {
            console.error("Update Error:", error.message);
            setPublishError('Something went wrong');
        }
    };
    

    return (
        <div className="p-3 max-w-3xl mx-auto min-h-screen">
            <h1 className="text-center text-3xl my-7 font-semibold">Update News</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                <TextInput
                    type="text"
                    placeholder="News Title"
                    required
                    id="newsName"
                    className="flex-1"
                    onChange={(e) => setFormData({ ...formData, Newsname: e.target.value })}
                    value={formData.Newsname }
                />
                   <Select
    className="text-black"
    onChange={(e) => {
        setcat(e.target.value); // Update UI
        setFormData({ ...formData, category: e.target.value }); // Sync with formData
    }}
    value={formData.category || category || "uncategorized"} // Ensure fallback value
>
    <option value="uncategorized">Select a category</option>
    <option value="Politics">Politics</option>
    <option value="World">World</option>
    <option value="Business">Business</option>
    <option value="Sports">Sports</option>
    <option value="Investigations">Investigations</option>
    <option value="Culture">Culture & Trends</option>
    <option value="Health">Health</option>
    <option value="Science">Science</option>
</Select>
                </div>

                <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
                    <FileInput
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <Button
                        onClick={handleUploadImage}
                        type="button"
                        gradientDuoTone="purpleToBlue"
                        size="sm"
                        outline
                        disabled={imageUploadProgress}
                    >
                        {imageUploadProgress ? (
                            <div className="w-16 h-16">
                                <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}`} />
                            </div>
                        ) : (
                            'Upload Image'
                        )}
                    </Button>
                </div>

                {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
                {image && <img src={image} alt="upload" className="w-full h-82 object-cover" />}

                <div className="mb-12">
                    <ReactQuill
                        value={formData.descreption || des}
                        onChange={(value) => setFormData({ ...formData, descreption: value })}
                        placeholder="Write your description here..."
                    />
                </div>

                <Button type="submit" gradientDuoTone="purpleToBlue">
                    Update
                </Button>
                {publishError && <Alert className="mt-5" color="failure">{publishError}</Alert>}
            </form>
        </div>
    );
}
