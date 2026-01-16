import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { categories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, LogOut, Upload, Image as ImageIcon, Loader2, Package, GripVertical } from "lucide-react";

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

// Category name translations
const getCategoryNameMM = (id: string): string => {
  const names: Record<string, string> = {
    "bottle-shells": "ဘူးအခွံများ",
    "caps": "အဖုံးများ",
  };
  return names[id] || id;
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
      toast.error("သင့်မှာ admin ခွင့်ပြုချက် မရှိပါ");
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
      toast.error("ပစ္စည်းများ ရယူ၍မရပါ: " + error.message);
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

      toast.success("ပုံ အပ်လုဒ်တင်ပြီးပါပြီ");
    } catch (error: any) {
      toast.error("ပုံ အပ်လုဒ်တင်၍မရပါ: " + error.message);
    } finally {
      setter(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.product_id.trim() || !formData.name.trim()) {
      toast.error("Product ID နှင့် အမည် ထည့်ရန်လိုအပ်ပါသည်");
      return;
    }

    try {
      if (editingProduct) {
        const { error } = await supabase
          .from("products")
          .update(formData)
          .eq("id", editingProduct.id);

        if (error) throw error;
        toast.success("ပစ္စည်း ပြင်ဆင်ပြီးပါပြီ");
      } else {
        const { error } = await supabase
          .from("products")
          .insert([formData]);

        if (error) throw error;
        toast.success("ပစ္စည်းအသစ် ထည့်ပြီးပါပြီ");
      }

      setIsDialogOpen(false);
      setEditingProduct(null);
      setFormData(emptyProduct);
      fetchProducts();
    } catch (error: any) {
      toast.error("ပစ္စည်း သိမ်း၍မရပါ: " + error.message);
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
    if (!confirm(`"${product.name}" ကို ဖျက်မှာ သေချာပါသလား?`)) return;

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", product.id);

      if (error) throw error;
      toast.success("ပစ္စည်း ဖျက်ပြီးပါပြီ");
      fetchProducts();
    } catch (error: any) {
      toast.error("ပစ္စည်း ဖျက်၍မရပါ: " + error.message);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-muted-foreground font-medium">လုပ်ဆောင်နေပါသည်...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/50">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">ပစ္စည်း စီမံခန့်ခွဲမှု</h1>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Dialog open={isDialogOpen} onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) {
                  setEditingProduct(null);
                  setFormData(emptyProduct);
                }
              }}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90 shadow-md">
                    <Plus className="w-4 h-4 mr-2" />
                    ပစ္စည်းအသစ်ထည့်ရန်
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader className="pb-4 border-b">
                    <DialogTitle className="text-xl font-semibold">
                      {editingProduct ? "ပစ္စည်း ပြင်ဆင်ရန်" : "ပစ္စည်းအသစ် ထည့်ရန်"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    {/* Basic Info Section */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">အခြေခံ အချက်အလက်</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="product_id" className="text-sm font-medium">Product ID *</Label>
                          <Input
                            id="product_id"
                            value={formData.product_id}
                            onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
                            placeholder="ဥပမာ - 0.5L-white"
                            className="h-11"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-medium">အမည် *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="ဥပမာ - ၁၁ ကျပ်သား (ဒိန်ဝိုင်းသေး) White"
                            className="h-11"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-sm font-medium">အမျိုးအစား *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value })}
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="အမျိုးအစား ရွေးပါ" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id}>
                                {getCategoryNameMM(cat.id)} ({cat.name})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Description Section */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">ဖော်ပြချက်</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="description_en" className="text-sm font-medium">ဖော်ပြချက် (အင်္ဂလိပ်)</Label>
                          <Textarea
                            id="description_en"
                            value={formData.description_en || ""}
                            onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                            placeholder="အင်္ဂလိပ်လို ဖော်ပြချက်"
                            className="min-h-[100px] resize-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description_mm" className="text-sm font-medium">ဖော်ပြချက် (မြန်မာ)</Label>
                          <Textarea
                            id="description_mm"
                            value={formData.description_mm || ""}
                            onChange={(e) => setFormData({ ...formData, description_mm: e.target.value })}
                            placeholder="မြန်မာလို ဖော်ပြချက်"
                            className="min-h-[100px] resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Specifications Section */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">အသေးစိတ်</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="sizes" className="text-sm font-medium">အရွယ်အစားများ (comma ခြားပါ)</Label>
                          <Input
                            id="sizes"
                            value={formData.sizes?.join(", ") || ""}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              sizes: e.target.value.split(",").map(s => s.trim()).filter(Boolean) 
                            })}
                            placeholder="ဥပမာ - 0.5L, 1L"
                            className="h-11"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="colors" className="text-sm font-medium">အရောင်များ (comma ခြားပါ)</Label>
                          <Input
                            id="colors"
                            value={formData.colors?.join(", ") || ""}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              colors: e.target.value.split(",").map(s => s.trim()).filter(Boolean) 
                            })}
                            placeholder="ဥပမာ - White, Blue"
                            className="h-11"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="material" className="text-sm font-medium">ပစ္စည်း</Label>
                          <Input
                            id="material"
                            value={formData.material || ""}
                            onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                            placeholder="ဥပမာ - Food-grade PET"
                            className="h-11"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="usage" className="text-sm font-medium">အသုံးပြုပုံ (comma ခြားပါ)</Label>
                          <Input
                            id="usage"
                            value={formData.usage?.join(", ") || ""}
                            onChange={(e) => setFormData({ 
                              ...formData, 
                              usage: e.target.value.split(",").map(s => s.trim()).filter(Boolean) 
                            })}
                            placeholder="ဥပမာ - Drinking water, Retail"
                            className="h-11"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="price_note" className="text-sm font-medium">စျေးနှုန်းမှတ်ချက်</Label>
                          <Input
                            id="price_note"
                            value={formData.price_note || ""}
                            onChange={(e) => setFormData({ ...formData, price_note: e.target.value })}
                            placeholder="ဥပမာ - စျေးနှုန်း အတွက် ဆက်သွယ်ပါ"
                            className="h-11"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="sort_order" className="text-sm font-medium">စီစဥ်မှု နံပါတ်</Label>
                          <Input
                            id="sort_order"
                            type="number"
                            value={formData.sort_order || 0}
                            onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                            className="h-11"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                        <Switch
                          id="is_active"
                          checked={formData.is_active ?? true}
                          onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                        />
                        <Label htmlFor="is_active" className="text-sm font-medium cursor-pointer">
                          ပြသရန် ဖွင့်ထားမည်
                        </Label>
                      </div>
                    </div>

                    {/* Images Section */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">ပုံများ</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">ပုံ (အဖုံးမပါ)</Label>
                          <div className="border-2 border-dashed border-border/60 rounded-xl p-4 text-center bg-muted/30 hover:bg-muted/50 transition-colors">
                            {formData.image_url ? (
                              <div className="space-y-3">
                                <div className="aspect-square max-h-40 mx-auto overflow-hidden rounded-lg bg-white">
                                  <img 
                                    src={formData.image_url} 
                                    alt="Product" 
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setFormData({ ...formData, image_url: null })}
                                  className="text-destructive hover:text-destructive"
                                >
                                  ဖယ်ရှားရန်
                                </Button>
                              </div>
                            ) : (
                              <label className="cursor-pointer block py-6">
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
                                <div className="flex flex-col items-center gap-3 text-muted-foreground">
                                  {uploading ? (
                                    <Loader2 className="w-10 h-10 animate-spin text-primary" />
                                  ) : (
                                    <Upload className="w-10 h-10" />
                                  )}
                                  <span className="text-sm font-medium">
                                    {uploading ? "တင်နေသည်..." : "ပုံတင်ရန် နှိပ်ပါ"}
                                  </span>
                                </div>
                              </label>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium">ပုံ (အဖုံးပါ)</Label>
                          <div className="border-2 border-dashed border-border/60 rounded-xl p-4 text-center bg-muted/30 hover:bg-muted/50 transition-colors">
                            {formData.image_cap_url ? (
                              <div className="space-y-3">
                                <div className="aspect-square max-h-40 mx-auto overflow-hidden rounded-lg bg-white">
                                  <img 
                                    src={formData.image_cap_url} 
                                    alt="Product with cap" 
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setFormData({ ...formData, image_cap_url: null })}
                                  className="text-destructive hover:text-destructive"
                                >
                                  ဖယ်ရှားရန်
                                </Button>
                              </div>
                            ) : (
                              <label className="cursor-pointer block py-6">
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
                                <div className="flex flex-col items-center gap-3 text-muted-foreground">
                                  {uploadingCap ? (
                                    <Loader2 className="w-10 h-10 animate-spin text-primary" />
                                  ) : (
                                    <Upload className="w-10 h-10" />
                                  )}
                                  <span className="text-sm font-medium">
                                    {uploadingCap ? "တင်နေသည်..." : "ပုံတင်ရန် နှိပ်ပါ"}
                                  </span>
                                </div>
                              </label>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsDialogOpen(false)}
                        className="px-6"
                      >
                        ပယ်ဖျက်ရန်
                      </Button>
                      <Button type="submit" className="px-6 bg-primary hover:bg-primary/90">
                        {editingProduct ? "သိမ်းဆည်းရန်" : "ထည့်သွင်းရန်"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>

              <Button 
                variant="outline" 
                onClick={handleSignOut}
                className="border-border/60 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
              >
                <LogOut className="w-4 h-4 mr-2" />
                ထွက်ရန်
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Bar */}
        <div className="mb-8 p-4 bg-card rounded-xl border border-border/50 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">စုစုပေါင်း ပစ္စည်းများ</p>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => {
                  const count = products.filter(p => p.category === cat.id).length;
                  return (
                    <span key={cat.id} className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
                      {getCategoryNameMM(cat.id)}: {count}
                    </span>
                  );
                })}
              </div>
              <div className="text-sm text-muted-foreground">
                {products.filter(p => p.is_active).length} ခု ပြသနေသည်
              </div>
            </div>
          </div>
        </div>

        {products.length === 0 ? (
          <Card className="border-dashed border-2 border-border/60">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="p-4 bg-muted rounded-full mb-4">
                <Package className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">ပစ္စည်း မရှိသေးပါ</h3>
              <p className="text-muted-foreground mb-6 text-center max-w-sm">
                ပထမဆုံး ပစ္စည်းကို ထည့်သွင်းပြီး စတင်ပါ
              </p>
              <Button onClick={() => setIsDialogOpen(true)} className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                ပစ္စည်းအသစ် ထည့်ရန်
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <Card 
                key={product.id} 
                className={`group relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-primary/30 ${!product.is_active ? 'opacity-60' : ''}`}
              >
                {/* Status & Category Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                  {!product.is_active && (
                    <span className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">
                      ဝှက်ထားသည်
                    </span>
                  )}
                  <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                    {getCategoryNameMM(product.category)}
                  </span>
                </div>

                {/* Image */}
                <div className="aspect-square bg-gradient-to-br from-muted/50 to-muted overflow-hidden">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-contain p-6 transition-transform duration-200 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-16 h-16 text-muted-foreground/40" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
                      <p className="text-xs text-muted-foreground truncate">{product.product_id}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                        onClick={() => handleEdit(product)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => handleDelete(product)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3 min-h-[2.5rem]">
                    {product.description_mm || product.description_en || "ဖော်ပြချက် မရှိပါ"}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {product.colors?.slice(0, 3).map((color) => (
                      <span
                        key={color}
                        className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded-md font-medium"
                      >
                        {color}
                      </span>
                    ))}
                    {product.sizes?.slice(0, 2).map((size) => (
                      <span
                        key={size}
                        className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-md font-medium"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
