"use client"
import React, { useState } from 'react';
import classes from './ResumeFrom.module.css';
import { useForm, useFieldArray } from 'react-hook-form';
import PdfPopup from '../PdfPopup/PdfPopup';
import Button from 'react-bootstrap/Button';
const ResumeForm = () => {
    const { register, handleSubmit, control, reset, setValue, formState: { errors, isValid, isDirty } } = useForm({ mode: "all" });
    const { fields: experiences, append: appendExperience, remove: removeExperience } = useFieldArray({ control, name: "experiences" });
    const { fields: educations, append: appendEducation, remove: removeEducation } = useFieldArray({ control, name: "educations" });
    const [showPdfPopup, setShowPdfPopup] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = async (data) => {
        console.log(data);
        setIsLoading(true);
        const response = await fetch('/api/build-resume', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            console.log(url);
            // setPdfUrl(pdfDataUrl);
            // setShowPdfPopup(true);
            const a = document.createElement('a');
            a.href = url;
            a.target = '_blank';
            // a.download = `${data?.name}.pdf`;
            document.body.appendChild(a);
            a.click();
            // a.remove();
            setIsLoading(false);
        } else {
            console.error('Failed to generate PDF');
            setIsLoading(false);
        }
        // try {
        //     const htmlContent = GenerateResume(data);
        //     reset();
        // } catch (error) {
        //     console.log(error);
        // }
    };

    const closePdfPopup = (value) => {
        setShowPdfPopup(value)
    }

    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="text-center mt-2">Build Your Resume</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className={classes?.form_area}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="Enter your name"
                                            className="form-control"
                                            {...register("name", { required: true })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="position" className="form-label">Position</label>
                                        <input
                                            type="text"
                                            id="position"
                                            placeholder="Enter position"
                                            className="form-control"
                                            {...register("position", { required: true })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="profileSummary" className="form-label">Profile Summary</label>
                                        <textarea cols={"50"} rows={"2"}
                                            type="text"
                                            id="profileSummary"
                                            placeholder="Enter Profile Summary"
                                            className="form-control"
                                            {...register("profileSummary", { required: true })}
                                        />
                                    </div>
                                </div>
                                <div className={classes?.form_area}>
                                    <div className="mb-3">
                                        <label htmlFor="profileSummary" className="form-label">phone</label>
                                        <input
                                            type="text"
                                            id="phone"
                                            placeholder="Enter phone"
                                            className="form-control"
                                            {...register("phone", { required: true })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">email</label>
                                        <input
                                            type="text"
                                            id="email"
                                            placeholder="Enter email"
                                            className="form-control"
                                            {...register("email", { required: true })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="linkedin" className="form-label">linkedin</label>
                                        <input
                                            type="text"
                                            id="linkedin"
                                            placeholder="Enter linkedin"
                                            className="form-control"
                                            {...register("linkedin", { required: true })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">address</label>
                                        <input
                                            type="text"
                                            id="address"
                                            placeholder="Enter address"
                                            className="form-control"
                                            {...register("address", { required: true })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h4>WORK EXPERIENCE </h4>

                                    <Button onClick={() => appendExperience()} variant="primary" size="lg" active>
                                        Add
                                    </Button>
                                </div>

                                {
                                    experiences.map((field, index) => (
                                        <div key={index}>
                                            <div className={classes?.form_area}>
                                                <div className="mb-3">
                                                    <label htmlFor="Company" className="form-label">Company</label>
                                                    <input
                                                        type="text"
                                                        id="Company"
                                                        placeholder="Enter Company"
                                                        className="form-control"
                                                        {...register(`experiences.${index}.company`, { required: true })}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="Position" className="form-label">Position</label>
                                                    <input
                                                        type="text"
                                                        id="Position"
                                                        placeholder="Enter Position"
                                                        className="form-control"
                                                        {...register(`experiences.${index}.position`, { required: true })}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="Duration" className="form-label">Duration</label>
                                                    <input
                                                        type="text"
                                                        id="Duration"
                                                        placeholder="Enter Duration"
                                                        className="form-control"
                                                        {...register(`experiences.${index}.duration`, { required: true })}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="Address" className="form-label">address</label>
                                                    <input
                                                        type="text"
                                                        id="address"
                                                        placeholder="Enter Address"
                                                        className="form-control"
                                                        {...register(`experiences.${index}.address`, { required: true })}
                                                    />
                                                </div>
                                            </div>
                                            <div className={classes?.form_area_description}>
                                                <div className="mb-3">
                                                    <label htmlFor="Description" className="form-label">Description</label>
                                                    <textarea cols={50} rows={5}
                                                        type="text"
                                                        id="Description"
                                                        placeholder="Enter Description"
                                                        className="form-control"
                                                        {...register(`experiences.${index}.description`, { required: true })}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <Button type="button" onClick={() => removeExperience(index)} variant="danger" size="lg" active>
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                }
                                <div>
                                    <h4>Education </h4>

                                    <Button onClick={() => appendEducation()} variant="primary" size="lg" active>
                                        Add
                                    </Button>
                                </div>

                                {
                                    educations.map((field, index) => (
                                        <div key={index}>
                                            <div className={classes?.form_area}>
                                                <div className="mb-3">
                                                    <label htmlFor="college" className="form-label">Schools/College</label>
                                                    <input
                                                        type="text"
                                                        id="college"
                                                        placeholder="Enter Schools/College"
                                                        className="form-control"
                                                        {...register(`educations.${index}.college`, { required: true })}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="Course" className="form-label">Course</label>
                                                    <input
                                                        type="text"
                                                        id="Course"
                                                        placeholder="Enter Course"
                                                        className="form-control"
                                                        {...register(`educations.${index}.course`, { required: true })}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="Duration" className="form-label">Duration</label>
                                                    <input
                                                        type="text"
                                                        id="Duration"
                                                        placeholder="Enter Duration"
                                                        className="form-control"
                                                        {...register(`educations.${index}.duration`, { required: true })}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="Address" className="form-label">address</label>
                                                    <input
                                                        type="text"
                                                        id="address"
                                                        placeholder="Enter Address"
                                                        className="form-control"
                                                        {...register(`educations.${index}.address`, { required: true })}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <Button type="button" onClick={() => removeEducation(index)} variant="danger" size="lg" active>
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                }
                                <div className={classes?.form_area}>
                                    <div className="mb-3">
                                        <label htmlFor="skills" className="form-label">Skills</label>
                                        <input
                                            type="text"
                                            id="skills"
                                            placeholder="Enter your skills"
                                            className="form-control"
                                            {...register("skills", { required: true })}
                                        />
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <Button type='submit' variant="info" size="lg" active>
                                        Preview
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            {/* {showPdfPopup && <PdfPopup showPdfPopup={showPdfPopup} pdfUrl={pdfUrl} closePdfPopup={closePdfPopup} />} */}
        </>
    )
}

export default ResumeForm
