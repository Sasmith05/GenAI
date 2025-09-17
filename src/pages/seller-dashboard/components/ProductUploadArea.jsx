import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProductUploadArea = ({ onProductUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [aiEnhancing, setAiEnhancing] = useState(false);
  const [productInfo, setProductInfo] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    story: ''
  });
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e?.dataTransfer?.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const imageFiles = files?.filter(file => file?.type?.startsWith('image/'));
    const newImages = imageFiles?.map((file, index) => ({
      id: Date.now() + index,
      file,
      url: URL.createObjectURL(file),
      enhanced: false,
      selected: true,
      aiCaption: ''
    }));
    
    setSelectedImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (id) => {
    setSelectedImages(prev => prev?.filter(img => img?.id !== id));
  };

  const toggleImageSelection = (id) => {
    setSelectedImages(prev => 
      prev?.map(img => 
        img?.id === id ? { ...img, selected: !img?.selected } : img
      )
    );
  };

  const handleAiEnhancement = async () => {
    setAiEnhancing(true);
    
    // Simulate AI enhancement process
    setTimeout(() => {
      setSelectedImages(prev => 
        prev?.map(img => ({
          ...img,
          enhanced: img?.selected,
          aiCaption: img?.selected ? `Beautiful handcrafted ${productInfo?.category || 'item'} with intricate details and premium quality materials.` : img?.aiCaption
        }))
      );
      setAiEnhancing(false);
    }, 2000);
  };

  const generateStoryPrompt = () => {
    const prompts = [
      `Tell the story behind this ${productInfo?.category || 'handcrafted piece'}. What inspired its creation?`,
      `Describe the traditional techniques used to create this ${productInfo?.category || 'item'}.`,
      `Share the cultural significance and heritage of this ${productInfo?.category || 'craft'}.`,
      `What makes this ${productInfo?.category || 'piece'} unique compared to mass-produced alternatives?`
    ];
    
    const randomPrompt = prompts?.[Math.floor(Math.random() * prompts?.length)];
    setProductInfo(prev => ({ ...prev, story: randomPrompt }));
  };

  const handleInputChange = (field, value) => {
    setProductInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleUpload = () => {
    const selectedImageData = selectedImages?.filter(img => img?.selected);
    if (selectedImageData?.length === 0 || !productInfo?.name || !productInfo?.price) {
      return;
    }

    const productData = {
      ...productInfo,
      images: selectedImageData,
      uploadedAt: new Date()?.toISOString()
    };

    onProductUpload(productData);
    
    // Reset form
    setSelectedImages([]);
    setProductInfo({
      name: '',
      description: '',
      price: '',
      category: '',
      story: ''
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-warm">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-card-foreground">Upload New Product</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Add images and product details with AI enhancement
        </p>
      </div>
      <div className="p-6 space-y-6">
        {/* Image Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-smooth ${
            dragActive 
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Icon name="Upload" size={24} className="text-muted-foreground" />
            </div>
            <div>
              <p className="text-lg font-medium text-card-foreground">
                Drag & drop images here
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                or click to browse files
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => fileInputRef?.current?.click()}
              iconName="Image"
              iconPosition="left"
            >
              Choose Images
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </div>

        {/* Selected Images */}
        {selectedImages?.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-card-foreground">Selected Images</h4>
              <Button
                variant="secondary"
                size="sm"
                loading={aiEnhancing}
                onClick={handleAiEnhancement}
                iconName="Sparkles"
                iconPosition="left"
              >
                {aiEnhancing ? 'Enhancing...' : 'AI Enhance'}
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {selectedImages?.map((image) => (
                <div
                  key={image?.id}
                  className={`relative rounded-lg overflow-hidden border-2 transition-smooth ${
                    image?.selected ? 'border-primary' : 'border-border'
                  }`}
                >
                  <div className="aspect-square">
                    <Image
                      src={image?.url}
                      alt="Product preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Selection Overlay */}
                  <div
                    className="absolute inset-0 bg-black/20 flex items-center justify-center cursor-pointer"
                    onClick={() => toggleImageSelection(image?.id)}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${
                      image?.selected ? 'bg-primary' : 'bg-transparent'
                    }`}>
                      {image?.selected && <Icon name="Check" size={16} color="white" />}
                    </div>
                  </div>
                  
                  {/* Enhancement Badge */}
                  {image?.enhanced && (
                    <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                      AI Enhanced
                    </div>
                  )}
                  
                  {/* Remove Button */}
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 w-6 h-6 p-0"
                    onClick={() => removeImage(image?.id)}
                    iconName="X"
                    iconSize={14}
                  />
                  
                  {/* AI Caption */}
                  {image?.aiCaption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-2">
                      <p className="text-xs line-clamp-2">{image?.aiCaption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Product Name"
            type="text"
            placeholder="Enter product name"
            value={productInfo?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
            required
          />
          
          <Input
            label="Price"
            type="number"
            placeholder="0.00"
            value={productInfo?.price}
            onChange={(e) => handleInputChange('price', e?.target?.value)}
            required
          />
          
          <Input
            label="Category"
            type="text"
            placeholder="e.g., Pottery, Jewelry, Textiles"
            value={productInfo?.category}
            onChange={(e) => handleInputChange('category', e?.target?.value)}
          />
          
          <div className="md:col-span-2">
            <Input
              label="Description"
              type="text"
              placeholder="Describe your product"
              value={productInfo?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
            />
          </div>
        </div>

        {/* Story Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-card-foreground">
              Product Story (Optional)
            </label>
            <Button
              variant="ghost"
              size="sm"
              onClick={generateStoryPrompt}
              iconName="Lightbulb"
              iconPosition="left"
            >
              AI Prompt
            </Button>
          </div>
          <textarea
            className="w-full min-h-[100px] p-3 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            placeholder="Tell the story behind your creation..."
            value={productInfo?.story}
            onChange={(e) => handleInputChange('story', e?.target?.value)}
          />
        </div>

        {/* Upload Button */}
        <div className="flex justify-end">
          <Button
            variant="default"
            onClick={handleUpload}
            disabled={selectedImages?.filter(img => img?.selected)?.length === 0 || !productInfo?.name || !productInfo?.price}
            iconName="Upload"
            iconPosition="left"
          >
            Upload Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductUploadArea;