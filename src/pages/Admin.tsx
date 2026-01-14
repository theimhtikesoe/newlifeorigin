import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, LogOut, Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import Header from "@/components/Header";

interface Product {
  id: string;
  product_id: string;
  name: string;
  category: string;
  description_en: string | null;
  description_mm: string | null;
  material: string | null;
  colors: string[] | null;
  sizes: string[] | null;
  usage: string[] | null;
  price_note: string | null;
  image_url: string | null;
  image_cap_url: string | null;
  is_active: boolean | null;
  sort_order: number | null;
}

const emptyProduct: Omit<Product, "id"> = {
  product_id: "",
  name: "",
  category: "bottle-shells",
  description_en: "",
  description_mm: "",
  material: "Food-grade PET",
  colors: ["White"],
  sizes: ["1L"],
  usage: ["Drinking water filling", "Retail packaging"],
  price_note: "Factory pricing available. Please contact our counter.",
  image_url: null,
  image_cap_url: null,
  is_active: true,
  sort_order: 0,
};

const Admin = () => {
  const { user, isLoading: authLoading, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Omit<Product, "id">>(emptyProduct);
  const [uploading, setUploading] = useState(false);
  const [uploadingCap, setUploadingCap] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/admin/login");
    } else if (!authLoading && user && !isAdmin) {
      toast.error("You don't have admin access");
      navigate("/");
    }
  }, [user, authLoading, isAdmin, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchProducts();
    }
  }, [user, isAdmin]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      toast.error("Failed to fetch products: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = async (file: File, isCapImage: boolean) => {
    const setter = isCapImage ? setUploadingCap : setUploading;
    setter(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

      if (isCapImage) {
        setFormData({ ...formData, image_cap_url: publicUrl });
      } else {
        setFormData({ ...formData, image_url: publicUrl });
      }

      toast.success("Image uploaded successfully");
    } catch (error: any) {
      toast.error("Failed to upload image: " + error.message);
    } finally {
      setter(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.product_id.trim() || !formData.name.trim()) {
      toast.error("Product ID and Name are required");
      return;
    }

    try {
      if (editingProduct) {
        const { error } = await supabase
          .from("products")
          .update(formData)
          .eq("id", editingProduct.id);

        if (error) throw error;
        toast.success("Product updated successfully");
      } else {
        const { error } = await supabase
          .from("products")
          .insert([formData]);

        if (error) throw error;
        toast.success("Product created successfully");
      }

      setIsDialogOpen(false);
      setEditingProduct(null);
      setFormData(emptyProduct);
      fetchProducts();
    } catch (error: any) {
      toast.error("Failed to save product: " + error.message);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      product_id: product.product_id,
      name: product.name,
      category: product.category,
      description_en: product.description_en || "",
      description_mm: product.description_mm || "",
      material: product.material || "Food-grade PET",
      colors: product.colors || ["White"],
      sizes: product.sizes || ["1L"],
      usage: product.usage || [],
      price_note: product.price_note || "",
      image_url: product.image_url,
      image_cap_url: product.image_cap_url,
      is_active: product.is_active,
      sort_order: product.sort_order,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (product: Product) => {
    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) return;

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", product.id);

      if (error) throw error;
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error: any) {
      toast.error("Failed to delete product: " + error.message);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Product Management</h1>
            <p className="text-muted-foreground">
              Logged in as: {user.email}
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) {
                setEditingProduct(null);
                setFormData(emptyProduct);
              }
            }}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="product_id">Product ID *</Label>
                      <Input
                        id="product_id"
                        value={formData.product_id}
                        onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
                        placeholder="e.g., 0.5L-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., 0.5L White"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="description_en">Description (English)</Label>
                      <Textarea
                        id="description_en"
                        value={formData.description_en || ""}
                        onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                        placeholder="English description"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description_mm">Description (Myanmar)</Label>
                      <Textarea
                        id="description_mm"
                        value={formData.description_mm || ""}
                        onChange={(e) => setFormData({ ...formData, description_mm: e.target.value })}
                        placeholder="Myanmar description"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sizes">Sizes (comma separated)</Label>
                      <Input
                        id="sizes"
                        value={formData.sizes?.join(", ") || ""}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          sizes: e.target.value.split(",").map(s => s.trim()).filter(Boolean) 
                        })}
                        placeholder="e.g., 0.5L, 1L"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="colors">Colors (comma separated)</Label>
                      <Input
                        id="colors"
                        value={formData.colors?.join(", ") || ""}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          colors: e.target.value.split(",").map(s => s.trim()).filter(Boolean) 
                        })}
                        placeholder="e.g., White, Blue"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sort_order">Sort Order</Label>
                    <Input
                      id="sort_order"
                      type="number"
                      value={formData.sort_order || 0}
                      onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                    />
                  </div>

                  {/* Image uploads */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Product Image (Without Cap)</Label>
                      <div className="border-2 border-dashed rounded-lg p-4 text-center">
                        {formData.image_url ? (
                          <div className="relative">
                            <img 
                              src={formData.image_url} 
                              alt="Product" 
                              className="w-full h-32 object-contain mb-2"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => setFormData({ ...formData, image_url: null })}
                            >
                              Remove
                            </Button>
                          </div>
                        ) : (
                          <label className="cursor-pointer block">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) uploadImage(file, false);
                              }}
                              disabled={uploading}
                            />
                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                              {uploading ? (
                                <Loader2 className="w-8 h-8 animate-spin" />
                              ) : (
                                <Upload className="w-8 h-8" />
                              )}
                              <span className="text-sm">
                                {uploading ? "Uploading..." : "Click to upload"}
                              </span>
                            </div>
                          </label>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Product Image (With Cap)</Label>
                      <div className="border-2 border-dashed rounded-lg p-4 text-center">
                        {formData.image_cap_url ? (
                          <div className="relative">
                            <img 
                              src={formData.image_cap_url} 
                              alt="Product with cap" 
                              className="w-full h-32 object-contain mb-2"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => setFormData({ ...formData, image_cap_url: null })}
                            >
                              Remove
                            </Button>
                          </div>
                        ) : (
                          <label className="cursor-pointer block">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) uploadImage(file, true);
                              }}
                              disabled={uploadingCap}
                            />
                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                              {uploadingCap ? (
                                <Loader2 className="w-8 h-8 animate-spin" />
                              ) : (
                                <Upload className="w-8 h-8" />
                              )}
                              <span className="text-sm">
                                {uploadingCap ? "Uploading..." : "Click to upload"}
                              </span>
                            </div>
                          </label>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingProduct ? "Update Product" : "Create Product"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {products.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <ImageIcon className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No products yet</h3>
              <p className="text-muted-foreground mb-4">Get started by adding your first product</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card key={product.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{product.product_id}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(product)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(product)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-3">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-contain p-4"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description_en || "No description"}
                  </p>
                  <div className="flex gap-2 mt-2">
                    {product.colors?.map((color) => (
                      <span
                        key={color}
                        className="text-xs px-2 py-1 bg-secondary rounded-full"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
