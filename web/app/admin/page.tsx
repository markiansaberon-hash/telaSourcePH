"use client";

import { useState, useEffect, useCallback } from "react";

interface Order {
  orderId: string;
  dateSubmitted: string;
  customerName: string;
  phone: string;
  contactMethod: string;
  location: string;
  fabricListText: string;
  imageUrl: string;
  notes: string;
  status: string;
  comments: string;
  fabricNotes: string;
}

const STATUSES = [
  "New",
  "In Progress",
  "Ready",
  "Delivered",
  "Paid",
  "Cancelled",
];

const STATUS_COLORS: Record<string, string> = {
  New: "bg-blue-100 text-blue-800",
  "In Progress": "bg-amber-100 text-amber-800",
  Ready: "bg-green-100 text-green-800",
  Delivered: "bg-teal-100 text-teal-800",
  Paid: "bg-emerald-100 text-emerald-800",
  Cancelled: "bg-red-100 text-red-800",
};

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-PH", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function relativeTime(iso: string) {
  try {
    const now = Date.now();
    const then = new Date(iso).getTime();
    const diff = now - then;
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  } catch {
    return "";
  }
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [key, setKey] = useState("");
  const [authError, setAuthError] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("All");
  const [view, setView] = useState<"list" | "kanban" | "gallery">("list");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [saving, setSaving] = useState(false);
  const [editingFabricId, setEditingFabricId] = useState<string | null>(null);
  const [editedFabricText, setEditedFabricText] = useState("");
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [editedNotesText, setEditedNotesText] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [galleryUrl, setGalleryUrl] = useState("");
  const [galleryImages, setGalleryImages] = useState<{ url: string; pathname: string; uploadedAt: string; size: number }[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);

  const fetchGalleryImages = useCallback(async () => {
    setGalleryLoading(true);
    try {
      const res = await fetch("/api/admin/gallery-images");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setGalleryImages(data);
      }
    } catch {
      // Fail silently
    } finally {
      setGalleryLoading(false);
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/orders");
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      const data = await res.json();
      if (Array.isArray(data)) setOrders(data);
    } catch {
      // Silently fail — will retry on next interval
    }
  }, []);

  // Check auth on mount
  useEffect(() => {
    fetch("/api/admin/orders").then((res) => {
      if (res.ok) {
        setAuthed(true);
        res.json().then((data) => {
          if (Array.isArray(data)) setOrders(data);
        });
      }
    });
  }, []);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    if (!authed) return;
    const interval = setInterval(fetchOrders, 60000);
    return () => clearInterval(interval);
  }, [authed, fetchOrders]);

  // Load gallery images when gallery view is active
  useEffect(() => {
    if (authed && view === "gallery") {
      fetchGalleryImages();
    }
  }, [authed, view, fetchGalleryImages]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
      if (res.ok) {
        setAuthed(true);
        fetchOrders();
      } else {
        setAuthError("Invalid admin key");
      }
    } catch {
      setAuthError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setOrders([]);
    setKey("");
  }

  async function updateStatus(orderId: string, status: string) {
    setSaving(true);
    try {
      await fetch("/api/admin/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status }),
      });
      setOrders((prev) =>
        prev.map((o) => (o.orderId === orderId ? { ...o, status } : o)),
      );
    } catch {
      // Fail silently
    } finally {
      setSaving(false);
    }
  }

  async function addComment(orderId: string) {
    if (!commentText.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/add-comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, comment: commentText.trim() }),
      });
      const data = await res.json();
      if (data.comments) {
        setOrders((prev) =>
          prev.map((o) =>
            o.orderId === orderId ? { ...o, comments: data.comments } : o,
          ),
        );
      } else {
        await fetchOrders();
      }
      setCommentText("");
    } catch {
      // Fail silently
    } finally {
      setSaving(false);
    }
  }

  async function saveFabricList(orderId: string) {
    setSaving(true);
    try {
      await fetch("/api/admin/update-fabric-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, fabricList: editedFabricText }),
      });
      setOrders((prev) =>
        prev.map((o) =>
          o.orderId === orderId ? { ...o, fabricListText: editedFabricText } : o,
        ),
      );
      setEditingFabricId(null);
    } catch {
      // Fail silently
    } finally {
      setSaving(false);
    }
  }

  async function saveFabricNotes(orderId: string) {
    setSaving(true);
    try {
      await fetch("/api/admin/update-fabric-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, fabricNotes: editedNotesText }),
      });
      setOrders((prev) =>
        prev.map((o) =>
          o.orderId === orderId ? { ...o, fabricNotes: editedNotesText } : o,
        ),
      );
      setEditingNotesId(null);
    } catch {
      // Fail silently
    } finally {
      setSaving(false);
    }
  }

  async function deleteOrder(orderId: string) {
    if (!window.confirm(`Delete order ${orderId}? This cannot be undone.`)) return;
    setDeleting(orderId);
    try {
      await fetch("/api/admin/delete-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      setOrders((prev) => prev.filter((o) => o.orderId !== orderId));
      setExpandedId(null);
    } catch {
      // Fail silently
    } finally {
      setDeleting(null);
    }
  }

  async function uploadGalleryImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setGalleryUploading(true);
    setGalleryUrl("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload-gallery", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setGalleryUrl(data.url);
        fetchGalleryImages();
      } else {
        alert(data.error || "Upload failed");
      }
    } catch {
      alert("Upload failed");
    } finally {
      setGalleryUploading(false);
      e.target.value = "";
    }
  }

  const filteredOrders =
    filter === "All" ? orders : orders.filter((o) => o.status === filter);

  const statusCounts = STATUSES.reduce(
    (acc, s) => {
      acc[s] = orders.filter((o) => o.status === s).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  // ============ LOGIN SCREEN ============
  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-xl bg-white p-8 shadow-[0_2px_12px_rgba(44,24,16,0.06)]"
        >
          <h1 className="mb-2 text-2xl font-extrabold text-text">
            TelaSource <span className="text-primary">Admin</span>
          </h1>
          <p className="mb-6 text-sm text-text-light">
            Enter admin key to continue
          </p>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Admin key"
            className="mb-4 w-full rounded-lg border border-[#D4C4B0] px-4 py-3 text-text focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            autoFocus
          />
          {authError && (
            <p className="mb-4 text-sm text-error">{authError}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-cream transition hover:bg-primary-dark disabled:opacity-60"
          >
            {loading ? "Checking..." : "Login"}
          </button>
        </form>
      </div>
    );
  }

  // ============ DASHBOARD ============
  return (
    <div className="min-h-screen bg-cream">
      {/* Admin Header */}
      <header className="border-b border-cream-dark bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold text-text">
            TelaSource <span className="text-primary">Admin</span>
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={fetchOrders}
              className="rounded-lg px-3 py-1.5 text-xs text-text-light transition hover:bg-cream-dark hover:text-text"
              title="Refresh orders"
            >
              Refresh
            </button>
            <div className="flex rounded-lg border border-cream-dark bg-cream-dark p-0.5">
              <button
                onClick={() => setView("list")}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${view === "list" ? "bg-white text-text shadow-sm" : "text-text-light"}`}
              >
                List
              </button>
              <button
                onClick={() => setView("kanban")}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${view === "kanban" ? "bg-white text-text shadow-sm" : "text-text-light"}`}
              >
                Kanban
              </button>
              <button
                onClick={() => setView("gallery")}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${view === "gallery" ? "bg-white text-text shadow-sm" : "text-text-light"}`}
              >
                Gallery
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-lg px-3 py-1.5 text-xs text-text-light transition hover:bg-cream-dark hover:text-text"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Status Filter Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("All")}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${filter === "All" ? "bg-text text-cream" : "bg-white text-text-light shadow-sm hover:text-text"}`}
          >
            All ({orders.length})
          </button>
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${filter === s ? "bg-text text-cream" : "bg-white text-text-light shadow-sm hover:text-text"}`}
            >
              {s} ({statusCounts[s] || 0})
            </button>
          ))}
        </div>

        {/* LIST VIEW */}
        {view === "list" && (
          <div className="space-y-2">
            {filteredOrders.length === 0 && (
              <p className="py-12 text-center text-text-muted">
                No orders found.
              </p>
            )}
            {filteredOrders.map((order) => (
              <div
                key={order.orderId}
                className="rounded-xl bg-white shadow-[0_1px_4px_rgba(44,24,16,0.06)]"
              >
                {/* Row */}
                <button
                  onClick={() =>
                    setExpandedId(
                      expandedId === order.orderId ? null : order.orderId,
                    )
                  }
                  className="flex w-full items-center gap-4 px-4 py-3 text-left transition hover:bg-cream/50"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-primary">
                        {order.orderId}
                      </span>
                      <span className="text-xs text-text-muted">
                        {relativeTime(order.dateSubmitted)}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-sm font-semibold text-text">
                      {order.customerName}
                    </p>
                  </div>
                  <div className="hidden items-center gap-3 sm:flex">
                    <span className="text-xs text-text-light">
                      {order.phone}
                    </span>
                    <span className="text-xs text-text-light">
                      {order.location}
                    </span>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_COLORS[order.status] || "bg-gray-100 text-gray-800"}`}
                  >
                    {order.status}
                  </span>
                  <svg
                    className={`h-4 w-4 text-text-muted transition ${expandedId === order.orderId ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Expanded Detail */}
                {expandedId === order.orderId && (
                  <div className="border-t border-cream-dark px-4 py-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      {/* Left: Order Details */}
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-semibold uppercase text-text-muted">
                            Customer
                          </p>
                          <p className="text-sm text-text">
                            {order.customerName} — {order.phone}
                          </p>
                          <p className="text-xs text-text-light">
                            {order.contactMethod} · {order.location}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase text-text-muted">
                            Date
                          </p>
                          <p className="text-sm text-text">
                            {formatDate(order.dateSubmitted)}
                          </p>
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold uppercase text-text-muted">
                              Fabric List
                            </p>
                            {editingFabricId !== order.orderId && (
                              <button
                                onClick={() => {
                                  setEditingFabricId(order.orderId);
                                  setEditedFabricText(order.fabricListText || "");
                                }}
                                className="text-xs text-primary transition hover:text-primary-dark"
                              >
                                Edit
                              </button>
                            )}
                          </div>
                          {editingFabricId === order.orderId ? (
                            <div className="mt-1">
                              <textarea
                                value={editedFabricText}
                                onChange={(e) => setEditedFabricText(e.target.value)}
                                rows={5}
                                className="w-full rounded-lg border border-[#D4C4B0] px-3 py-2 text-sm text-text focus:border-primary focus:outline-none"
                              />
                              <div className="mt-1 flex gap-2">
                                <button
                                  onClick={() => saveFabricList(order.orderId)}
                                  disabled={saving}
                                  className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-cream transition hover:bg-primary-dark disabled:opacity-60"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingFabricId(null)}
                                  className="rounded-lg px-3 py-1.5 text-xs text-text-light transition hover:bg-cream-dark"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p className="whitespace-pre-wrap text-sm text-text">
                              {order.fabricListText || "—"}
                            </p>
                          )}
                        </div>
                        {order.imageUrl && (
                          <div>
                            <p className="text-xs font-semibold uppercase text-text-muted">
                              Photo
                            </p>
                            <a
                              href={order.imageUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-1 inline-block"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={order.imageUrl}
                                alt="Fabric list"
                                className="max-h-48 rounded-lg border border-cream-dark"
                              />
                            </a>
                          </div>
                        )}
                        {order.notes && (
                          <div>
                            <p className="text-xs font-semibold uppercase text-text-muted">
                              Customer Notes
                            </p>
                            <p className="text-sm text-text">{order.notes}</p>
                          </div>
                        )}

                        {/* Admin Fabric Notes */}
                        <div className="rounded-lg bg-amber-50 p-3">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold uppercase text-amber-700">
                              Fabric Notes (Admin)
                            </p>
                            {editingNotesId !== order.orderId && (
                              <button
                                onClick={() => {
                                  setEditingNotesId(order.orderId);
                                  setEditedNotesText(order.fabricNotes || "");
                                }}
                                className="text-xs text-primary transition hover:text-primary-dark"
                              >
                                Edit
                              </button>
                            )}
                          </div>
                          {editingNotesId === order.orderId ? (
                            <div className="mt-1">
                              <textarea
                                value={editedNotesText}
                                onChange={(e) => setEditedNotesText(e.target.value)}
                                rows={4}
                                placeholder="e.g. Oxford White (25 rolls): 15 from Supplier A @ PHP 10, 10 from Supplier B @ PHP 12.5"
                                className="w-full rounded-lg border border-amber-200 bg-white px-3 py-2 text-sm text-text focus:border-primary focus:outline-none"
                              />
                              <div className="mt-1 flex gap-2">
                                <button
                                  onClick={() => saveFabricNotes(order.orderId)}
                                  disabled={saving}
                                  className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-cream transition hover:bg-primary-dark disabled:opacity-60"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingNotesId(null)}
                                  className="rounded-lg px-3 py-1.5 text-xs text-text-light transition hover:bg-cream-dark"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p className="mt-1 whitespace-pre-wrap text-sm text-text">
                              {order.fabricNotes || "No notes yet"}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Right: Status + Comments */}
                      <div className="space-y-4">
                        <div>
                          <p className="mb-1.5 text-xs font-semibold uppercase text-text-muted">
                            Status
                          </p>
                          <select
                            value={order.status}
                            onChange={(e) =>
                              updateStatus(order.orderId, e.target.value)
                            }
                            disabled={saving}
                            className="w-full rounded-lg border border-[#D4C4B0] px-3 py-2 text-sm text-text focus:border-primary focus:outline-none"
                          >
                            {STATUSES.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <p className="mb-1.5 text-xs font-semibold uppercase text-text-muted">
                            Internal Comments
                          </p>
                          {order.comments && (
                            <div className="mb-3 max-h-40 overflow-y-auto rounded-lg bg-cream p-3">
                              {order.comments
                                .split("\n")
                                .filter(Boolean)
                                .map((c, i) => (
                                  <p
                                    key={i}
                                    className="mb-1 text-xs text-text-light"
                                  >
                                    {c}
                                  </p>
                                ))}
                            </div>
                          )}
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter")
                                  addComment(order.orderId);
                              }}
                              placeholder="Add a comment..."
                              className="flex-1 rounded-lg border border-[#D4C4B0] px-3 py-2 text-sm focus:border-primary focus:outline-none"
                            />
                            <button
                              onClick={() => addComment(order.orderId)}
                              disabled={saving || !commentText.trim()}
                              className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-cream transition hover:bg-primary-dark disabled:opacity-60"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Delete Order */}
                    <div className="mt-4 flex justify-end border-t border-cream-dark pt-3">
                      <button
                        onClick={() => deleteOrder(order.orderId)}
                        disabled={deleting === order.orderId}
                        className="rounded-lg px-3 py-1.5 text-xs text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                      >
                        {deleting === order.orderId ? "Deleting..." : "Delete Order"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* GALLERY UPLOAD */}
        {view === "gallery" && (
          <div className="rounded-xl bg-white p-6 shadow-[0_1px_4px_rgba(44,24,16,0.06)]">
            <h2 className="mb-4 text-lg font-bold text-text">Gallery Image Upload</h2>
            <p className="mb-4 text-sm text-text-light">
              Upload an image, copy the URL, then paste it into the <strong>Image URL</strong> column
              in your Google Sheets &quot;Fabrics&quot; tab.
            </p>

            <div className="mb-6">
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-text">
                  Choose Image
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={uploadGalleryImage}
                  disabled={galleryUploading}
                  className="w-full text-sm text-text-light file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-cream file:transition hover:file:bg-primary-dark disabled:opacity-60"
                />
              </label>
              {galleryUploading && (
                <p className="mt-2 text-sm text-text-muted">Uploading...</p>
              )}
            </div>

            {galleryUrl && (
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <p className="mb-2 text-sm font-semibold text-green-800">Image uploaded!</p>
                <div className="mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={galleryUrl}
                    alt="Uploaded"
                    className="max-h-48 rounded-lg border border-cream-dark"
                  />
                </div>
                <p className="mb-1 text-xs font-semibold text-text-muted">Copy this URL to Google Sheets:</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={galleryUrl}
                    className="flex-1 rounded-lg border border-[#D4C4B0] bg-white px-3 py-2 text-xs text-text"
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(galleryUrl);
                    }}
                    className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-cream transition hover:bg-primary-dark"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 rounded-lg bg-cream p-4">
              <p className="mb-2 text-sm font-semibold text-text">How it works:</p>
              <ol className="list-inside list-decimal space-y-1 text-sm text-text-light">
                <li>Upload an image above</li>
                <li>Copy the generated URL</li>
                <li>Open your Google Sheet → &quot;Fabrics&quot; tab</li>
                <li>Paste the URL in the <strong>Image URL</strong> column (C)</li>
                <li>Set <strong>Category</strong> to &quot;fabric&quot; or &quot;shop&quot;</li>
                <li>Set <strong>Active</strong> to TRUE</li>
              </ol>
            </div>

            {/* Uploaded Images */}
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-bold text-text">
                Uploaded Images ({galleryImages.length})
              </h3>
              {galleryLoading ? (
                <p className="text-sm text-text-muted">Loading...</p>
              ) : galleryImages.length === 0 ? (
                <p className="text-sm text-text-muted">No images uploaded yet.</p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {galleryImages.map((img) => (
                    <div
                      key={img.url}
                      className="overflow-hidden rounded-lg border border-cream-dark bg-cream"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.url}
                        alt={img.pathname}
                        className="aspect-[4/3] w-full object-cover"
                      />
                      <div className="p-3">
                        <p className="mb-1 truncate text-xs text-text-muted">
                          {img.pathname}
                        </p>
                        <p className="mb-2 text-xs text-text-muted">
                          {(img.size / 1024).toFixed(0)} KB · {new Date(img.uploadedAt).toLocaleDateString("en-PH")}
                        </p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            readOnly
                            value={img.url}
                            className="min-w-0 flex-1 rounded border border-[#D4C4B0] bg-white px-2 py-1 text-xs text-text"
                            onClick={(e) => (e.target as HTMLInputElement).select()}
                          />
                          <button
                            onClick={() => navigator.clipboard.writeText(img.url)}
                            className="shrink-0 rounded bg-primary px-2 py-1 text-xs font-semibold text-cream transition hover:bg-primary-dark"
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* KANBAN VIEW */}
        {view === "kanban" && (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {STATUSES.map((status) => {
              const statusOrders = orders.filter((o) => o.status === status);
              return (
                <div
                  key={status}
                  className="min-w-[260px] flex-shrink-0 rounded-xl bg-white p-3 shadow-[0_1px_4px_rgba(44,24,16,0.06)]"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-text">{status}</h3>
                    <span className="rounded-full bg-cream-dark px-2 py-0.5 text-xs font-semibold text-text-light">
                      {statusOrders.length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {statusOrders.map((order) => (
                      <button
                        key={order.orderId}
                        onClick={() => {
                          setExpandedId(order.orderId);
                          setView("list");
                          setFilter("All");
                        }}
                        className="w-full rounded-lg border border-cream-dark bg-cream p-3 text-left transition hover:border-primary/30"
                      >
                        <p className="text-xs font-bold text-primary">
                          {order.orderId}
                        </p>
                        <p className="mt-0.5 text-sm font-semibold text-text">
                          {order.customerName}
                        </p>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-xs text-text-light">
                            {order.phone}
                          </span>
                          <span className="text-xs text-text-muted">
                            {relativeTime(order.dateSubmitted)}
                          </span>
                        </div>
                      </button>
                    ))}
                    {statusOrders.length === 0 && (
                      <p className="py-4 text-center text-xs text-text-muted">
                        No orders
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
