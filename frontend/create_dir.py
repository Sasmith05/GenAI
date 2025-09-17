import os

# Base directory
base_dir = "frontend"

# Folder and file structure as dictionary
structure = {
    "public": [
        "index.html",
        "manifest.json",
        "favicon.ico",
        "locales/en.json",
        "locales/es.json",
        "locales/fr.json",
        "locales/hi.json"
    ],
    "src": {
        "components": {
            "common": {
                "Header": ["Header.jsx", "Header.module.css", "LanguageSelector.jsx"],
                "Footer": ["Footer.jsx", "Footer.module.css"],
                "Layout": ["Layout.jsx", "Layout.module.css"],
                "LoadingSpinner": ["LoadingSpinner.jsx", "LoadingSpinner.module.css"],
                "ErrorBoundary": ["ErrorBoundary.jsx"],
                "ProtectedRoute": ["ProtectedRoute.jsx"]
            },
            "ui": {
                "Button": ["Button.jsx", "Button.module.css"],
                "Modal": ["Modal.jsx", "Modal.module.css"],
                "Input": ["Input.jsx", "Input.module.css"],
                "Card": ["Card.jsx", "Card.module.css"],
                "Badge": ["Badge.jsx", "Badge.module.css"],
                "Toast": ["Toast.jsx", "Toast.module.css", "ToastProvider.jsx"]
            },
            "ai": {
                "Chatbot": ["Chatbot.jsx", "Chatbot.module.css", "ChatMessage.jsx"],
                "TTSButton": ["TTSButton.jsx", "TTSButton.module.css"],
                "STTInput": ["STTInput.jsx", "STTInput.module.css"],
                "ImageEnhancer": ["ImageEnhancer.jsx", "ImageEnhancer.module.css"],
                "StoryGenerator": ["StoryGenerator.jsx", "StoryGenerator.module.css"]
            },
            "auth": {
                "LoginForm": ["LoginForm.jsx", "LoginForm.module.css"],
                "RegisterForm": ["RegisterForm.jsx", "RegisterForm.module.css"],
                "RoleSelector": ["RoleSelector.jsx", "RoleSelector.module.css"],
                "SocialLogin": ["SocialLogin.jsx", "SocialLogin.module.css"]
            },
            "product": {
                "ProductCard": ["ProductCard.jsx", "ProductCard.module.css"],
                "ProductGrid": ["ProductGrid.jsx", "ProductGrid.module.css"],
                "ProductDetail": [
                    "ProductDetail.jsx", "ProductDetail.module.css",
                    "ProductImages.jsx", "ProductInfo.jsx", "ReviewSection.jsx"
                ],
                "ARViewer": ["ARViewer.jsx", "ARViewer.module.css"],
                "3DViewer": ["3DViewer.jsx", "3DViewer.module.css"],
                "ProductUpload": [
                    "ProductUpload.jsx", "ProductUpload.module.css",
                    "ImageUploader.jsx", "ProductForm.jsx"
                ],
                "ProductSearch": [
                    "ProductSearch.jsx", "ProductSearch.module.css", "SearchFilters.jsx"
                ]
            },
            "analytics": {
                "Dashboard": ["AnalyticsDashboard.jsx", "AnalyticsDashboard.module.css"],
                "Charts": [
                    "SalesChart.jsx", "FeedbackChart.jsx",
                    "TrendChart.jsx", "PricingInsights.jsx"
                ],
                "Reports": ["SentimentReport.jsx", "TrendReport.jsx"]
            },
            "profile": {
                "CustomerProfile": [
                    "CustomerProfile.jsx", "CustomerProfile.module.css",
                    "PersonalInfo.jsx", "OrderHistory.jsx", "Preferences.jsx"
                ],
                "SellerProfile": [
                    "SellerProfile.jsx", "SellerProfile.module.css",
                    "BusinessInfo.jsx", "PortfolioSection.jsx", "SocialMediaIntegration.jsx"
                ]
            },
            "promotion": {
                "PromotionBanner": ["PromotionBanner.jsx", "PromotionBanner.module.css"],
                "EventCard": ["EventCard.jsx", "EventCard.module.css"],
                "TrendingSection": ["TrendingSection.jsx", "TrendingSection.module.css"]
            }
        },
        "pages": {
            "HomePage": [
                "HomePage.jsx", "HomePage.module.css",
                "HeroSection.jsx", "FeaturedProducts.jsx",
                "TrendingSection.jsx", "PromotionSection.jsx"
            ],
            "AuthPage": [
                "AuthPage.jsx", "AuthPage.module.css",
                "LoginPage.jsx", "RegisterPage.jsx"
            ],
            "customer": {
                "CustomerDashboard": [
                    "CustomerDashboard.jsx", "CustomerDashboard.module.css",
                    "ShoppingSection.jsx", "WishlistSection.jsx", "OrdersSection.jsx"
                ],
                "ProductBrowse": ["ProductBrowse.jsx", "ProductBrowse.module.css"],
                "ProductDetailPage": ["ProductDetailPage.jsx", "ProductDetailPage.module.css"],
                "ProfilePage": ["CustomerProfilePage.jsx", "CustomerProfilePage.module.css"]
            },
            "seller": {
                "SellerDashboard": [
                    "SellerDashboard.jsx", "SellerDashboard.module.css",
                    "OverviewSection.jsx", "ProductManagement.jsx", "AnalyticsSection.jsx"
                ],
                "ProductManagement": [
                    "ProductManagement.jsx", "ProductManagement.module.css",
                    "ProductList.jsx", "AddProduct.jsx", "EditProduct.jsx"
                ],
                "AnalyticsPage": ["AnalyticsPage.jsx", "AnalyticsPage.module.css"],
                "ProfilePage": ["SellerProfilePage.jsx", "SellerProfilePage.module.css"]
            }
        },
        "context": [
            "AuthContext.jsx", "I18nContext.jsx", "ThemeContext.jsx",
            "ChatbotContext.jsx", "ToastContext.jsx"
        ],
        "hooks": [
            "useAuth.js", "useI18n.js", "useFirestore.js", "useStorage.js",
            "useTTS.js", "useSTT.js", "useAI.js", "useAnalytics.js"
        ],
        "services": {
            "firebase": ["config.js", "auth.js", "firestore.js", "storage.js"],
            "api": [
                "client.js", "authAPI.js", "productAPI.js",
                "userAPI.js", "analyticsAPI.js"
            ],
            "ai": [
                "chatbot.js", "imageEnhancement.js", "storyGeneration.js",
                "tts.js", "stt.js", "sentimentAnalysis.js", "pricingInsights.js"
            ],
            "social": ["socialMedia.js", "instagram.js", "facebook.js", "twitter.js"],
            "utils": ["validation.js", "formatters.js", "constants.js", "helpers.js"]
        },
        "styles": [
            "globals.css", "variables.css", "components.css", "responsive.css"
        ],
        "App.jsx": None,
        "App.css": None,
        "index.js": None,
        "routes.jsx": None
    },
    "package.json": None,
    "README.md": None
}

def create_structure(base_path, struct):
    if isinstance(struct, dict):
        for name, content in struct.items():
            path = os.path.join(base_path, name)

            # detect files (contain a dot)
            if "." in name:
                os.makedirs(os.path.dirname(path), exist_ok=True)
                with open(path, "w") as f:
                    f.write("")
            else:
                os.makedirs(path, exist_ok=True)
                create_structure(path, content)

    elif isinstance(struct, list):
        for item in struct:
            if isinstance(item, dict):
                create_structure(base_path, item)
            else:
                file_path = os.path.join(base_path, item)
                os.makedirs(os.path.dirname(file_path), exist_ok=True)
                with open(file_path, "w") as f:
                    f.write("")

    elif struct is None:
        os.makedirs(os.path.dirname(base_path), exist_ok=True)
        with open(base_path, "w") as f:
            f.write("")

if __name__ == "__main__":
    create_structure(".", {base_dir: structure})
    print("✅ Frontend structure created successfully!")
