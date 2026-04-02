"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const CONTACT_METHODS = [
  "Viber",
  "WhatsApp",
  "Messenger",
  "Text (SMS)",
  "Line",
];

const LOCATIONS = [
  "Manila",
  "Bulacan",
  "Cavite",
  "Laguna",
  "Rizal",
  "Pampanga",
  "Cebu",
  "Other",
];

const UNITS = ["Rolls", "Yards", "Meters", "Pieces"];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

interface FabricItem {
  name: string;
  quantity: string;
  unit: string;
}

const EMPTY_ITEM: FabricItem = { name: "", quantity: "", unit: "Rolls" };

export default function UploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    contactMethod: "",
    location: "",
    fabricList: "",
    notes: "",
  });
  const [fabricItems, setFabricItems] = useState<FabricItem[]>([
    { ...EMPTY_ITEM },
  ]);
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleItemChange(
    index: number,
    field: keyof FabricItem,
    value: string,
  ) {
    const updated = [...fabricItems];
    updated[index] = { ...updated[index], [field]: value };
    setFabricItems(updated);
  }

  function addItem() {
    setFabricItems([...fabricItems, { ...EMPTY_ITEM }]);
  }

  function removeItem(index: number) {
    if (fabricItems.length <= 1) return;
    setFabricItems(fabricItems.filter((_, i) => i !== index));
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!ACCEPTED_TYPES.includes(selected.type)) {
      setError("Please upload a JPG, PNG, WebP, or PDF file.");
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      setError("File is too large. Maximum size is 10MB.");
      return;
    }

    setError("");
    setFile(selected);

    if (selected.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setFilePreview(reader.result as string);
      reader.readAsDataURL(selected);
    } else {
      setFilePreview(null);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.name || !form.phone || !form.contactMethod || !form.location) {
      setError("Please fill in all required fields.");
      return;
    }

    // Check that at least one input method is used
    const hasFile = !!file;
    const hasTextList = form.fabricList.trim().length > 0;
    const filledItems = fabricItems.filter((item) => item.name.trim());
    const hasStructuredItems = filledItems.length > 0;

    if (!hasFile && !hasTextList && !hasStructuredItems) {
      setError(
        "Please provide your fabric list: upload a photo, type it, or add items below.",
      );
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("phone", form.phone);
      formData.append("contactMethod", form.contactMethod);
      formData.append("location", form.location);
      formData.append("fabricList", form.fabricList);
      formData.append("notes", form.notes);

      if (hasFile) {
        formData.append("file", file);
      }

      if (hasStructuredItems) {
        formData.append("fabricItems", JSON.stringify(filledItems));
      }

      const res = await fetch("/api/submit", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(
          data.error || "Something went wrong. Please try again.",
        );
      }

      const data = await res.json();
      router.push(`/thank-you?orderId=${data.orderId}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-3 text-base transition focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none";

  return (
    <section className="bg-surface px-4 py-12 md:py-20">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-3xl font-bold text-primary md:text-4xl">
            Submit Your Fabric List
          </h1>
          <p className="text-text-light">
            Upload a photo, type your list, or add items one by one. We&apos;ll
            get back to you within 24 hours with a quotation.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl bg-white p-6 shadow-sm md:p-10"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-semibold text-primary"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              className={inputClass}
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="mb-1.5 block text-sm font-semibold text-primary"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="09XX XXX XXXX"
              className={inputClass}
              required
            />
          </div>

          {/* Preferred Contact Method */}
          <div>
            <label
              htmlFor="contactMethod"
              className="mb-1.5 block text-sm font-semibold text-primary"
            >
              How should we contact you?{" "}
              <span className="text-red-500">*</span>
            </label>
            <select
              id="contactMethod"
              name="contactMethod"
              value={form.contactMethod}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="">Select preferred app</option>
              {CONTACT_METHODS.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="mb-1.5 block text-sm font-semibold text-primary"
            >
              Location / Delivery Area{" "}
              <span className="text-red-500">*</span>
            </label>
            <select
              id="location"
              name="location"
              value={form.location}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="">Select your area</option>
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 pt-2">
            <p className="text-sm font-semibold text-primary">
              Your Fabric List{" "}
              <span className="font-normal text-text-light">
                (use any method below)
              </span>
            </p>
          </div>

          {/* File Upload */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-primary">
              Option 1: Upload a Photo
            </label>
            <p className="mb-3 text-xs text-text-light">
              Take a clear photo of your handwritten list. JPG, PNG, WebP, or
              PDF. Max 10MB.
            </p>
            <div
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  fileInputRef.current?.click();
              }}
              role="button"
              tabIndex={0}
              className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition hover:border-primary hover:bg-primary/5"
            >
              {filePreview ? (
                <div className="space-y-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={filePreview}
                    alt="Preview"
                    className="mx-auto max-h-48 rounded-lg"
                  />
                  <p className="text-sm text-text-light">{file?.name}</p>
                  <p className="text-xs text-accent">Click to change</p>
                </div>
              ) : file ? (
                <div className="space-y-2">
                  <p className="text-sm text-text-light">{file.name}</p>
                  <p className="text-xs text-accent">Click to change</p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="font-medium text-primary">
                    Tap to upload your fabric list
                  </p>
                  <p className="text-xs text-text-light">
                    JPG, PNG, WebP, or PDF
                  </p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp,.pdf"
              onChange={handleFile}
              className="hidden"
            />
          </div>

          {/* Text List */}
          <div>
            <label
              htmlFor="fabricList"
              className="mb-1.5 block text-sm font-semibold text-primary"
            >
              Option 2: Type Your List
            </label>
            <textarea
              id="fabricList"
              name="fabricList"
              value={form.fabricList}
              onChange={handleChange}
              placeholder="e.g. Oxford white 50 rolls, Katsa black 20 rolls, TC Twill navy 10 rolls"
              rows={4}
              className={inputClass}
            />
          </div>

          {/* Structured Fabric Items Repeater */}
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-primary">
              Option 3: Add Items One by One
            </label>
            <p className="mb-3 text-xs text-text-light">
              Best for large orders. Add each fabric separately.
            </p>

            <div className="space-y-3">
              {fabricItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 rounded-lg border border-gray-200 bg-surface p-3"
                >
                  <div className="min-w-0 flex-1">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) =>
                        handleItemChange(index, "name", e.target.value)
                      }
                      placeholder="Fabric name (e.g. Oxford White)"
                      className="mb-2 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(index, "quantity", e.target.value)
                        }
                        placeholder="Qty"
                        min="1"
                        className="w-20 rounded border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                      />
                      <select
                        value={item.unit}
                        onChange={(e) =>
                          handleItemChange(index, "unit", e.target.value)
                        }
                        className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                      >
                        {UNITS.map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {fabricItems.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="mt-1 rounded p-1 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                      aria-label="Remove item"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addItem}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 py-3 text-sm font-medium text-primary transition hover:border-primary hover:bg-primary/5"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Another Fabric
            </button>
          </div>

          {/* Notes */}
          <div>
            <label
              htmlFor="notes"
              className="mb-1.5 block text-sm font-semibold text-primary"
            >
              Special Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="e.g. Need by Friday, prefer supplier X, same quality as last order"
              rows={3}
              className={inputClass}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-accent px-6 py-4 text-lg font-bold text-white transition hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit My List"}
          </button>

          <p className="text-center text-xs text-text-light">
            Your information is safe with us. We only use it to process your
            order.
          </p>
        </form>
      </div>
    </section>
  );
}
