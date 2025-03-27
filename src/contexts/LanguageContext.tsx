
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type LanguageType = 'en' | 'uk';

type TranslationKeys = {
  'app.appName': string;
  'app.dashboard': string;
  'app.establishments': string;
  'app.transactions': string;
  'app.employees': string;
  'app.products': string;
  'app.settings': string;
  'app.loading': string;
  'app.save': string;
  'app.cancel': string;
  'app.edit': string;
  'app.delete': string;
  'app.yes': string;
  'app.no': string;
  'app.confirm': string;
  'app.success': string;
  'app.error': string;
  'app.details': string;
  'app.close': string;
  'app.add': string;
  'app.search': string;
  'app.back': string;
  'app.currency': string;

  'dashboard.title': string;
  'dashboard.summary': string;
  'dashboard.totalDeliveries': string;
  'dashboard.totalPayments': string;
  'dashboard.outstandingBalance': string;
  'dashboard.recentTransactions': string;
  'dashboard.viewAllTransactions': string;
  'dashboard.noTransactions': string;
  'dashboard.viewAllEstablishments': string;
  'dashboard.establishmentCount': string;
  'dashboard.subtitle': string;
  'dashboard.totalOutstanding': string;
  'dashboard.startRecording': string;
  'dashboard.establishments': string;
  'dashboard.totalEstablishments': string;
  'dashboard.getStarted': string;
  'dashboard.quickActions': string;
  'dashboard.viewAll': string;
  'dashboard.addNew': string;
  'dashboard.balance': string;
  'dashboard.deliveriesValue': string;
  'dashboard.paymentsCollected': string;

  'establishments.title': string;
  'establishments.addNew': string;
  'establishments.search': string;
  'establishments.name': string;
  'establishments.contactPerson': string;
  'establishments.balance': string;
  'establishments.actions': string;
  'establishments.noEstablishments': string;
  'establishments.deleteConfirm': string;
  'establishments.deleteSuccess': string;
  'establishments.deleteError': string;
  'establishments.viewDetails': string;
  'establishments.editEstablishment': string;
  'establishments.backToEstablishments': string;
  'establishments.detailsTitle': string;
  'establishments.contactInfo': string;
  'establishments.transactionHistory': string;
  'establishments.addTransaction': string;
  'establishments.noTransactionsYet': string;
  'establishments.subtitle': string;
  'establishments.add': string;
  'establishments.contact': string;
  'establishments.phone': string;
  'establishments.email': string;
  'establishments.noEstablishmentsMatching': string;
  'establishments.noEstablishmentsYet': string;
  'establishments.transaction': string;
  'establishments.recordTransaction': string;
  
  'establishmentForm.title': string;
  'establishmentForm.editTitle': string;
  'establishmentForm.nameLabel': string;
  'establishmentForm.namePlaceholder': string;
  'establishmentForm.addressLabel': string;
  'establishmentForm.addressPlaceholder': string;
  'establishmentForm.contactNameLabel': string;
  'establishmentForm.contactNamePlaceholder': string;
  'establishmentForm.contactPhoneLabel': string;
  'establishmentForm.contactPhonePlaceholder': string;
  'establishmentForm.contactEmailLabel': string;
  'establishmentForm.contactEmailPlaceholder': string;
  'establishmentForm.notesLabel': string;
  'establishmentForm.notesPlaceholder': string;
  'establishmentForm.saveButton': string;
  'establishmentForm.cancelButton': string;
  'establishmentForm.success': string;
  'establishmentForm.error': string;
  'establishmentForm.updateSuccess': string;
  'establishmentForm.updateError': string;
  'establishmentForm.back': string;
  'establishmentForm.title.add': string;
  'establishmentForm.title.edit': string;
  'establishmentForm.name': string;
  'establishmentForm.address': string;
  'establishmentForm.contactPerson': string;
  'establishmentForm.phoneNumber': string;
  'establishmentForm.emailAddress': string;
  'establishmentForm.notes': string;
  'establishmentForm.save': string;
  'establishmentForm.update': string;
  'establishmentForm.success.add': string;
  'establishmentForm.success.update': string;

  'transactions.title': string;
  'transactions.addNew': string;
  'transactions.search': string;
  'transactions.date': string;
  'transactions.establishment': string;
  'transactions.type': string;
  'transactions.amount': string;
  'transactions.actions': string;
  'transactions.noTransactions': string;
  'transactions.deleteConfirm': string;
  'transactions.deleteSuccess': string;
  'transactions.deleteError': string;
  'transactions.delivery': string;
  'transactions.payment': string;
  'transactions.dateRange': string;
  'transactions.from': string;
  'transactions.to': string;
  'transactions.filter': string;
  'transactions.clearFilters': string;
  'transactions.all': string;
  'transactions.subtitle': string;
  'transactions.add': string;
  'transactions.notes': string;
  'transactions.adjustFilters': string;
  'transactions.noTransactionsYet': string;
  'transactions.allTypes': string;
  'transactions.deliveries': string;
  'transactions.payments': string;
  'transactions.paymentStatusPaid': string;
  'transactions.paymentStatusCredit': string;
  
  'transactionForm.title': string;
  'transactionForm.back': string;
  'transactionForm.establishment': string;
  'transactionForm.selectEstablishment': string;
  'transactionForm.type': string;
  'transactionForm.selectType': string;
  'transactionForm.amount': string;
  'transactionForm.enterAmount': string;
  'transactionForm.date': string;
  'transactionForm.pickDate': string;
  'transactionForm.notes': string;
  'transactionForm.additionalNotes': string;
  'transactionForm.save': string;
  'transactionForm.success': string;
  'transactionForm.error': string;
  'transactionForm.employee': string;
  'transactionForm.selectEmployee': string;
  'transactionForm.paymentStatus': string;
  'transactionForm.selectPaymentStatus': string;
  'transactionForm.paymentStatusPaid': string;
  'transactionForm.paymentStatusCredit': string;

  'employees.title': string;
  'employees.addNew': string;
  'employees.search': string;
  'employees.name': string;
  'employees.employeeNumber': string;
  'employees.email': string;
  'employees.mobile': string;
  'employees.actions': string;
  'employees.noEmployees': string;
  'employees.deleteConfirm': string;
  'employees.deleteSuccess': string;
  'employees.deleteError': string;
  'employees.viewDetails': string;
  'employees.editEmployee': string;
  'employees.backToEmployees': string;
  'employees.detailsTitle': string;
  'employees.contactInfo': string;
  'employees.address': string;
  'employees.phone': string;
  'employees.notes': string;
  'employees.idNotProvided': string;
  'employees.notFound': string;
  'employees.subtitle': string;
  'employees.add': string;
  'employees.phoneOptional': string;
  'employees.notesOptional': string;
  'employees.enterName': string;
  'employees.enterEmail': string;
  'employees.enterMobile': string;
  'employees.enterPhone': string;
  'employees.enterAddress': string;
  'employees.enterNotes': string;
  'employees.autoGenerated': string;
  'employees.deleteTitle': string;
  'employees.deleteConfirmation': string;
  'employees.updateSuccess': string;
  'employees.addSuccess': string;
  'employees.saveError': string;
  
  'employeeForm.title': string;
  'employeeForm.editTitle': string;
  'employeeForm.nameLabel': string;
  'employeeForm.namePlaceholder': string;
  'employeeForm.emailLabel': string;
  'employeeForm.emailPlaceholder': string;
  'employeeForm.mobileLabel': string;
  'employeeForm.mobilePlaceholder': string;
  'employeeForm.phoneLabel': string;
  'employeeForm.phonePlaceholder': string;
  'employeeForm.addressLabel': string;
  'employeeForm.addressPlaceholder': string;
  'employeeForm.notesLabel': string;
  'employeeForm.notesPlaceholder': string;
  'employeeForm.saveButton': string;
  'employeeForm.cancelButton': string;
  'employeeForm.success': string;
  'employeeForm.error': string;
  'employeeForm.updateSuccess': string;
  'employeeForm.updateError': string;
  'employeeForm.back': string;

  'products.title': string;
  'products.addNew': string;
  'products.search': string;
  'products.id': string;
  'products.name': string;
  'products.category': string;
  'products.stock': string;
  'products.price': string;
  'products.actions': string;
  'products.noProducts': string;
  'products.deleteConfirm': string;
  'products.deleteSuccess': string;
  'products.deleteError': string;
  'products.viewDetails': string;
  'products.editProduct': string;
  'products.backToProducts': string;
  'products.lowStock': string;
  'products.inStock': string;
  'products.outOfStock': string;
  'products.subtitle': string;
  'products.add': string;
  'products.available': string;
  'products.empty': string;
  'products.emptyDesc': string;
  'products.noLowStock': string;
  'products.adequateStock': string;
  
  'productForm.title': string;
  'productForm.editTitle': string;
  'productForm.productIdLabel': string;
  'productForm.productIdPlaceholder': string;
  'productForm.titleLabel': string;
  'productForm.titlePlaceholder': string;
  'productForm.descriptionLabel': string;
  'productForm.descriptionPlaceholder': string;
  'productForm.categoryLabel': string;
  'productForm.categoryPlaceholder': string;
  'productForm.quantityLabel': string;
  'productForm.quantityPlaceholder': string;
  'productForm.lowStockLimitLabel': string;
  'productForm.lowStockLimitPlaceholder': string;
  'productForm.sellingPriceLabel': string;
  'productForm.sellingPricePlaceholder': string;
  'productForm.buyingPriceLabel': string;
  'productForm.buyingPricePlaceholder': string;
  'productForm.saveButton': string;
  'productForm.cancelButton': string;
  'productForm.success': string;
  'productForm.error': string;
  'productForm.updateSuccess': string;
  'productForm.updateError': string;
  'productForm.back': string;
  'productForm.addTitle': string;
  'productForm.productId': string;
  'productForm.date': string;
  'productForm.description': string;
  'productForm.category': string;
  'productForm.selectCategory': string;
  'productForm.newCategory': string;
  'productForm.quantity': string;
  'productForm.lowStockLimit': string;
  'productForm.sellingUnitPrice': string;
  'productForm.buyingUnitPrice': string;
  'productForm.totalSellingPrice': string;
  'productForm.saveProduct': string;

  'settings.title': string;
  'settings.language': string;
  'settings.languageLabel': string;
  'settings.theme': string;
  'settings.themeLabel': string;
  'settings.themeLight': string;
  'settings.themeDark': string;
  'settings.themeSystem': string;
  'settings.saveButton': string;
  'settings.saveSuccess': string;
  'settings.systemDefault': string;
  'settings.english': string;
  'settings.ukrainian': string;
  'settings.subtitle': string;
  'settings.languageDesc': string;
  'settings.saved': string;
  'settings.savedDesc': string;
  
  'nav.dashboard': string;
  'nav.establishments': string;
  'nav.transactions': string;
  'nav.employees': string;
  'nav.products': string;
  'nav.settings': string;
  
  'auth.title': string;
  'auth.subtitle': string;
  'auth.login': string;
  'auth.register': string;
  'auth.email': string;
  'auth.password': string;
  'auth.confirmPassword': string;
  'auth.processing': string;
  'auth.loginSuccess': string;
  'auth.loginSuccessDesc': string;
  'auth.loginError': string;
  'auth.loginErrorDesc': string;
  'auth.registerSuccess': string;
  'auth.registerSuccessDesc': string;
  'auth.registerError': string;
  'auth.registerErrorDesc': string;
};

// Define translations object
const translations: Record<LanguageType, TranslationKeys> = {
  en: {
    // Common
    'app.save': 'Save',
    'app.cancel': 'Cancel',
    'app.edit': 'Edit',
    'app.delete': 'Delete',
    'app.add': 'Add',
    'app.search': 'Search',
    'app.back': 'Back',
    'app.currency': 'UAH',
    'app.loading': 'Loading...',
    'app.appName': 'Distribution Manager',
    'app.dashboard': 'Dashboard',
    'app.establishments': 'Establishments',
    'app.transactions': 'Transactions',
    'app.employees': 'Employees',
    'app.products': 'Products',
    'app.settings': 'Settings',
    'app.yes': 'Yes',
    'app.no': 'No',
    'app.confirm': 'Confirm',
    'app.success': 'Success',
    'app.error': 'Error',
    'app.details': 'Details',
    'app.close': 'Close',
    
    // Settings
    'settings.title': 'Settings',
    'settings.subtitle': 'Configure application settings',
    'settings.language': 'Language Settings',
    'settings.languageDesc': 'Choose your preferred language for the application',
    'settings.saved': 'Settings Saved',
    'settings.savedDesc': 'Your preferences have been updated successfully',
    'settings.languageLabel': 'Language',
    'settings.theme': 'Theme',
    'settings.themeLabel': 'Theme Mode',
    'settings.themeLight': 'Light',
    'settings.themeDark': 'Dark',
    'settings.themeSystem': 'System',
    'settings.saveButton': 'Save Settings',
    'settings.saveSuccess': 'Settings saved successfully',
    'settings.systemDefault': 'System Default',
    'settings.english': 'English',
    'settings.ukrainian': 'Ukrainian',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.establishments': 'Establishments',
    'nav.transactions': 'Transactions',
    'nav.employees': 'Employees',
    'nav.products': 'Products',
    'nav.settings': 'Settings',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.subtitle': 'Overview of your biltong distribution business',
    'dashboard.totalOutstanding': 'Total Outstanding',
    'dashboard.totalDeliveries': 'Total Deliveries',
    'dashboard.totalPayments': 'Total Payments',
    'dashboard.recentTransactions': 'Recent Transactions',
    'dashboard.noTransactions': 'No transactions yet',
    'dashboard.startRecording': 'Start by recording your first biltong delivery or payment',
    'dashboard.establishments': 'Establishments',
    'dashboard.totalEstablishments': 'Total registered businesses',
    'dashboard.getStarted': 'Get Started',
    'dashboard.quickActions': 'Quick actions to manage your business',
    'dashboard.viewAll': 'View all',
    'dashboard.addNew': 'Add New',
    'dashboard.balance': 'Balance from all establishments',
    'dashboard.deliveriesValue': 'Value of biltong delivered',
    'dashboard.paymentsCollected': 'Money collected from establishments',
    'dashboard.summary': 'Summary',
    'dashboard.outstandingBalance': 'Outstanding Balance',
    'dashboard.viewAllTransactions': 'View All Transactions',
    'dashboard.viewAllEstablishments': 'View All Establishments',
    'dashboard.establishmentCount': 'Establishment Count',
    
    // Establishments
    'establishments.title': 'Establishments',
    'establishments.subtitle': 'Manage your biltong distribution establishments',
    'establishments.add': 'Add Establishment',
    'establishments.search': 'Search establishments...',
    'establishments.contact': 'Contact',
    'establishments.phone': 'Phone',
    'establishments.email': 'Email',
    'establishments.balance': 'Balance',
    'establishments.noEstablishments': 'No establishments found',
    'establishments.noEstablishmentsMatching': 'No establishments matching',
    'establishments.noEstablishmentsYet': 'You haven\'t added any establishments yet',
    'establishments.transaction': 'Transaction',
    'establishments.recordTransaction': 'Record Transaction',
    'establishments.addTransaction': 'Add a new delivery or payment for',
    'establishments.addNew': 'Add New Establishment',
    'establishments.name': 'Name',
    'establishments.contactPerson': 'Contact Person',
    'establishments.actions': 'Actions',
    'establishments.deleteConfirm': 'Are you sure you want to delete this establishment?',
    'establishments.deleteSuccess': 'Establishment deleted successfully',
    'establishments.deleteError': 'Error deleting establishment',
    'establishments.viewDetails': 'View Details',
    'establishments.editEstablishment': 'Edit Establishment',
    'establishments.backToEstablishments': 'Back to Establishments',
    'establishments.detailsTitle': 'Establishment Details',
    'establishments.contactInfo': 'Contact Information',
    'establishments.transactionHistory': 'Transaction History',
    'establishments.noTransactionsYet': 'No transactions yet',
    
    // Add/Edit Establishment
    'establishmentForm.title.add': 'Add New Establishment',
    'establishmentForm.title.edit': 'Edit Establishment',
    'establishmentForm.name': 'Establishment Name',
    'establishmentForm.address': 'Address',
    'establishmentForm.contactPerson': 'Contact Person',
    'establishmentForm.phoneNumber': 'Phone Number',
    'establishmentForm.emailAddress': 'Email Address',
    'establishmentForm.notes': 'Notes (Optional)',
    'establishmentForm.back': 'Back to Establishments',
    'establishmentForm.save': 'Add Establishment',
    'establishmentForm.update': 'Update Establishment',
    'establishmentForm.success.add': 'Establishment added successfully',
    'establishmentForm.success.update': 'Establishment updated successfully',
    'establishmentForm.error': 'Failed to save establishment',
    'establishmentForm.title': 'Add Establishment',
    'establishmentForm.editTitle': 'Edit Establishment',
    'establishmentForm.nameLabel': 'Name',
    'establishmentForm.namePlaceholder': 'Enter establishment name',
    'establishmentForm.addressLabel': 'Address',
    'establishmentForm.addressPlaceholder': 'Enter address',
    'establishmentForm.contactNameLabel': 'Contact Name',
    'establishmentForm.contactNamePlaceholder': 'Enter contact name',
    'establishmentForm.contactPhoneLabel': 'Contact Phone',
    'establishmentForm.contactPhonePlaceholder': 'Enter contact phone',
    'establishmentForm.contactEmailLabel': 'Contact Email',
    'establishmentForm.contactEmailPlaceholder': 'Enter contact email',
    'establishmentForm.notesLabel': 'Notes',
    'establishmentForm.notesPlaceholder': 'Enter notes (optional)',
    'establishmentForm.saveButton': 'Save',
    'establishmentForm.cancelButton': 'Cancel',
    'establishmentForm.success': 'Establishment saved successfully',
    'establishmentForm.updateSuccess': 'Establishment updated successfully',
    'establishmentForm.updateError': 'Error updating establishment',
    
    // Transactions
    'transactions.title': 'Transactions',
    'transactions.subtitle': 'Manage your biltong deliveries and payments',
    'transactions.add': 'Record Transaction',
    'transactions.search': 'Search transactions...',
    'transactions.date': 'Date',
    'transactions.establishment': 'Establishment',
    'transactions.type': 'Type',
    'transactions.amount': 'Amount',
    'transactions.notes': 'Notes',
    'transactions.delivery': 'Delivery',
    'transactions.payment': 'Payment',
    'transactions.noTransactions': 'No transactions found',
    'transactions.adjustFilters': 'Try adjusting your filters to see more results',
    'transactions.noTransactionsYet': 'You haven\'t recorded any transactions yet',
    'transactions.allTypes': 'All Types',
    'transactions.deliveries': 'Deliveries',
    'transactions.payments': 'Payments',
    'transactions.addNew': 'Add New Transaction',
    'transactions.actions': 'Actions',
    'transactions.deleteConfirm': 'Are you sure you want to delete this transaction?',
    'transactions.deleteSuccess': 'Transaction deleted successfully',
    'transactions.deleteError': 'Error deleting transaction',
    'transactions.dateRange': 'Date Range',
    'transactions.from': 'From',
    'transactions.to': 'To',
    'transactions.filter': 'Filter',
    'transactions.clearFilters': 'Clear Filters',
    'transactions.all': 'All',
    'transactions.paymentStatusPaid': 'Paid Upfront',
    'transactions.paymentStatusCredit': 'Credit (To be paid later)',
    
    // Transaction Form
    'transactionForm.title': 'Record New Transaction',
    'transactionForm.establishment': 'Establishment',
    'transactionForm.selectEstablishment': 'Select an establishment',
    'transactionForm.type': 'Transaction Type',
    'transactionForm.selectType': 'Select transaction type',
    'transactionForm.amount': 'Amount (UAH)',
    'transactionForm.enterAmount': 'Enter amount',
    'transactionForm.date': 'Date',
    'transactionForm.pickDate': 'Pick a date',
    'transactionForm.notes': 'Notes (Optional)',
    'transactionForm.additionalNotes': 'Enter any additional notes',
    'transactionForm.save': 'Record Transaction',
    'transactionForm.success': 'Transaction recorded successfully',
    'transactionForm.error': 'Failed to save transaction',
    'transactionForm.back': 'Back to Transactions',
    'transactionForm.employee': 'Employee',
    'transactionForm.selectEmployee': 'Select employee',
    'transactionForm.paymentStatus': 'Payment Status',
    'transactionForm.selectPaymentStatus': 'Select payment status',
    'transactionForm.paymentStatusPaid': 'Paid Upfront',
    'transactionForm.paymentStatusCredit': 'Credit (To be paid later)',
    
    // Employees
    'employees.title': 'Employees',
    'employees.subtitle': 'Manage your team members',
    'employees.add': 'Add Employee',
    'employees.addNew': 'Add New Employee',
    'employees.editEmployee': 'Edit Employee',
    'employees.search': 'Search employees...',
    'employees.backToEmployees': 'Back to Employees',
    'employees.noEmployees': 'No employees found',
    'employees.employeeNumber': 'Employee Number',
    'employees.name': 'Name',
    'employees.email': 'Email',
    'employees.mobile': 'Mobile',
    'employees.phone': 'Phone',
    'employees.phoneOptional': 'Phone (Optional)',
    'employees.address': 'Address',
    'employees.notes': 'Notes',
    'employees.notesOptional': 'Notes (Optional)',
    'employees.actions': 'Actions',
    'employees.enterName': 'Enter employee name',
    'employees.enterEmail': 'Enter email address',
    'employees.enterMobile': 'Enter mobile number',
    'employees.enterPhone': 'Enter phone number',
    'employees.enterAddress': 'Enter address',
    'employees.enterNotes': 'Add any additional notes here',
    'employees.autoGenerated': 'Auto-generated',
    'employees.deleteTitle': 'Delete Employee',
    'employees.deleteConfirmation': 'Are you sure you want to delete this employee? This action cannot be undone.',
    'employees.deleteConfirm': 'Are you sure you want to delete this employee?',
    'employees.deleteSuccess': 'Employee deleted successfully',
    'employees.deleteError': 'Failed to delete employee',
    'employees.updateSuccess': 'Employee updated successfully',
    'employees.addSuccess': 'Employee added successfully',
    'employees.saveError': 'Failed to save employee',
    'employees.idNotProvided': 'Employee ID not provided',
    'employees.notFound': 'Employee not found',
    'employees.viewDetails': 'View Details',
    'employees.detailsTitle': 'Employee Details',
    'employees.contactInfo': 'Contact Information',
    
    // Employee Form
    'employeeForm.title': 'Add Employee',
    'employeeForm.editTitle': 'Edit Employee',
    'employeeForm.nameLabel': 'Name',
    'employeeForm.namePlaceholder': 'Enter employee name',
    'employeeForm.emailLabel': 'Email',
    'employeeForm.emailPlaceholder': 'Enter email address',
    'employeeForm.mobileLabel': 'Mobile',
    'employeeForm.mobilePlaceholder': 'Enter mobile number',
    'employeeForm.phoneLabel': 'Phone (Optional)',
    'employeeForm.phonePlaceholder': 'Enter phone number',
    'employeeForm.addressLabel': 'Address',
    'employeeForm.addressPlaceholder': 'Enter address',
    'employeeForm.notesLabel': 'Notes (Optional)',
    'employeeForm.notesPlaceholder': 'Enter any additional notes',
    'employeeForm.saveButton': 'Save Employee',
    'employeeForm.cancelButton': 'Cancel',
    'employeeForm.success': 'Employee saved successfully',
    'employeeForm.error': 'Error saving employee',
    'employeeForm.updateSuccess': 'Employee updated successfully',
    'employeeForm.updateError': 'Error updating employee',
    'employeeForm.back': 'Back to Employees',
    
    // Products
    'products.title': 'Products',
    'products.subtitle': 'Manage your inventory',
    'products.add': 'Add Product',
    'products.search': 'Search products...',
    'products.available': 'Available',
    'products.lowStock': 'Low Stock',
    'products.empty': 'List is empty!',
    'products.emptyDesc': 'Add some products to see them here.',
    'products.noLowStock': 'No low stock items',
    'products.adequateStock': 'All your products have adequate stock levels.',
    'products.inStock': 'In Stock',
    'products.price': 'Price',
    'products.addNew': 'Add New Product',
    'products.id': 'ID',
    'products.name': 'Name',
    'products.category': 'Category',
    'products.stock': 'Stock',
    'products.actions': 'Actions',
    'products.noProducts': 'No products found',
    'products.deleteConfirm': 'Are you sure you want to delete this product?',
    'products.deleteSuccess': 'Product deleted successfully',
    'products.deleteError': 'Error deleting product',
    'products.viewDetails': 'View Details',
    'products.editProduct': 'Edit Product',
    'products.backToProducts': 'Back to Products',
    'products.outOfStock': 'Out of Stock',
    
    // Product Form
    'productForm.addTitle': 'Add New Product',
    'productForm.back': 'Back to Products',
    'productForm.productId': 'Product ID',
    'productForm.date': 'Date',
    'productForm.title': 'Title',
    'productForm.description': 'Description',
    'productForm.category': 'Category',
    'productForm.selectCategory': 'Select category',
    'productForm.newCategory': 'New Category',
    'productForm.quantity': 'Quantity',
    'productForm.lowStockLimit': 'Low Stock Limit',
    'productForm.sellingUnitPrice': 'Selling Unit Price (UAH)',
    'productForm.buyingUnitPrice': 'Buying Unit Price (UAH)',
    'productForm.totalSellingPrice': 'Total Selling Price',
    'productForm.saveProduct': 'Save Product',
    'productForm.success': 'Product added successfully!',
    'productForm.error': 'Failed to save product',
    'productForm.editTitle': 'Edit Product',
    'productForm.productIdLabel': 'Product ID',
    'productForm.productIdPlaceholder': 'Enter product ID',
    'productForm.titleLabel': 'Title',
    'productForm.titlePlaceholder': 'Enter product title',
    'productForm.descriptionLabel': 'Description',
    'productForm.descriptionPlaceholder': 'Enter product description',
    'productForm.categoryLabel': 'Category',
    'productForm.categoryPlaceholder': 'Select product category',
    'productForm.quantityLabel': 'Quantity',
    'productForm.quantityPlaceholder': 'Enter quantity',
    'productForm.lowStockLimitLabel': 'Low Stock Limit',
    'productForm.lowStockLimitPlaceholder': 'Enter low stock threshold',
    'productForm.sellingPriceLabel': 'Selling Price',
    'productForm.sellingPricePlaceholder': 'Enter selling price',
    'productForm.buyingPriceLabel': 'Buying Price',
    'productForm.buyingPricePlaceholder': 'Enter buying price',
    'productForm.saveButton': 'Save',
    'productForm.cancelButton': 'Cancel',
    'productForm.updateSuccess': 'Product updated successfully',
    'productForm.updateError': 'Error updating product',
    
    // Auth
    'auth.title': 'Authentication',
    'auth.subtitle': 'Login or register to your account',
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.processing': 'Processing...',
    'auth.loginSuccess': 'Login successful',
    'auth.loginSuccessDesc': 'You have successfully logged in',
    'auth.loginError': 'Login failed',
    'auth.loginErrorDesc': 'Please check your credentials and try again',
    'auth.registerSuccess': 'Registration successful',
    'auth.registerSuccessDesc': 'Please check your email for verification',
    'auth.registerError': 'Registration failed',
    'auth.registerErrorDesc': 'Please try again or use a different email',
  },
  uk: {
    // Common
    'app.save': 'Зберегти',
    'app.cancel': 'Скасувати',
    'app.edit': 'Редагувати',
    'app.delete': 'Видалити',
    'app.add': 'Додати',
    'app.search': 'Пошук',
    'app.back': 'Назад',
    'app.currency': 'ГРН',
    'app.loading': 'Завантаження...',
    'app.appName': 'Менеджер Дистрибуції',
    'app.dashboard': 'Панель',
    'app.establishments': 'Заклади',
    'app.transactions': 'Транзакції',
    'app.employees': 'Співробітники',
    'app.products': 'Товари',
    'app.settings': 'Налаштування',
    'app.yes': 'Так',
    'app.no': 'Ні',
    'app.confirm': 'Підтвердити',
    'app.success': 'Успішно',
    'app.error': 'Помилка',
    'app.details': 'Деталі',
    'app.close': 'Закрити',
    
    // Settings
    'settings.title': 'Налаштування',
    'settings.subtitle': 'Налаштування застосунку',
    'settings.language': 'Налаштування мови',
    'settings.languageDesc': 'Виберіть бажану мову для застосунку',
    'settings.saved': 'Налаштування збережено',
    'settings.savedDesc': 'Ваші налаштування успішно оновлено',
    'settings.languageLabel': 'Мова',
    'settings.theme': 'Тема',
    'settings.themeLabel': 'Режим теми',
    'settings.themeLight': 'Світла',
    'settings.themeDark': 'Темна',
    'settings.themeSystem': 'Системна',
    'settings.saveButton': 'Зберегти налаштування',
    'settings.saveSuccess': 'Налаштування успішно збережено',
    'settings.systemDefault': 'Системна',
    'settings.english': 'Англійська',
    'settings.ukrainian': 'Українська',
    
    // Navigation
    'nav.dashboard': 'Панель',
    'nav.establishments': 'Заклади',
    'nav.transactions': 'Транзакції',
    'nav.employees': 'Співробітники',
    'nav.products': 'Товари',
    'nav.settings': 'Налаштування',
    
    // Dashboard
    'dashboard.title': 'Панель',
    'dashboard.subtitle': 'Огляд вашого бізнесу з розповсюдження білтонгу',
    'dashboard.totalOutstanding': 'Загальна заборгованість',
    'dashboard.totalDeliveries': 'Загальні поставки',
    'dashboard.totalPayments': 'Загальні платежі',
    'dashboard.recentTransactions': 'Останні транзакції',
    'dashboard.noTransactions': 'Ще немає транзакцій',
    'dashboard.startRecording': 'Почніть із запису першої доставки білтонгу або платежу',
    'dashboard.establishments': 'Заклади',
    'dashboard.totalEstablishments': 'Загальна кількість зареєстрованих закладів',
    'dashboard.getStarted': 'Почати',
    'dashboard.quickActions': 'Швидкі дії для управління вашим бізнесом',
    'dashboard.viewAll': 'Переглянути все',
    'dashboard.addNew': 'Додати новий',
    'dashboard.balance': 'Баланс від усіх закладів',
    'dashboard.deliveriesValue': 'Вартість доставленого білтонгу',
    'dashboard.paymentsCollected': 'Гроші, зібрані від закладів',
    'dashboard.summary': 'Підсумок',
    'dashboard.outstandingBalance': 'Непогашений баланс',
    'dashboard.viewAllTransactions': 'Переглянути всі транзакції',
    'dashboard.viewAllEstablishments': 'Переглянути всі заклади',
    'dashboard.establishmentCount': 'Кількість закладів',
    
    // Establishments
    'establishments.title': 'Заклади',
    'establishments.subtitle': 'Управління закладами розповсюдження білтонгу',
    'establishments.add': 'Додати заклад',
    'establishments.search': 'Пошук закладів...',
    'establishments.contact': 'Контакт',
    'establishments.phone': 'Телефон',
    'establishments.email': 'Електронна пошта',
    'establishments.balance': 'Баланс',
    'establishments.noEstablishments': 'Заклади не знайдено',
    'establishments.noEstablishmentsMatching': 'Немає закладів, що відповідають',
    'establishments.noEstablishmentsYet': 'Ви ще не додали жодного закладу',
    'establishments.transaction': 'Транзакція',
    'establishments.recordTransaction': 'Записати транзакцію',
    'establishments.addTransaction': 'Додати нову доставку або платіж для',
    'establishments.addNew': 'Додати новий заклад',
    'establishments.name': 'Назва',
    'establishments.contactPerson': 'Контактна особа',
    'establishments.actions': 'Дії',
    'establishments.deleteConfirm': 'Ви впевнені, що хочете видалити цей заклад?',
    'establishments.deleteSuccess': 'Заклад успішно видалено',
    'establishments.deleteError': 'Помилка видалення закладу',
    'establishments.viewDetails': 'Переглянути деталі',
    'establishments.editEstablishment': 'Редагувати заклад',
    'establishments.backToEstablishments': 'Назад до закладів',
    'establishments.detailsTitle': 'Деталі закладу',
    'establishments.contactInfo': 'Контактна інформація',
    'establishments.transactionHistory': 'Історія транзакцій',
    'establishments.noTransactionsYet': 'Ще немає транзакцій',
    
    // Add/Edit Establishment
    'establishmentForm.title.add': 'Додати новий заклад',
    'establishmentForm.title.edit': 'Редагувати заклад',
    'establishmentForm.name': 'Назва закладу',
    'establishmentForm.address': 'Адреса',
    'establishmentForm.contactPerson': 'Контактна особа',
    'establishmentForm.phoneNumber': 'Номер телефону',
    'establishmentForm.emailAddress': 'Електронна адреса',
    'establishmentForm.notes': 'Примітки (Необов\'язково)',
    'establishmentForm.back': 'Назад до закладів',
    'establishmentForm.save': 'Додати заклад',
    'establishmentForm.update': 'Оновити заклад',
    'establishmentForm.success.add': 'Заклад успішно додано',
    'establishmentForm.success.update': 'Заклад успішно оновлено',
    'establishmentForm.error': 'Не вдалося зберегти заклад',
    'establishmentForm.title': 'Додати заклад',
    'establishmentForm.editTitle': 'Редагувати заклад',
    'establishmentForm.nameLabel': 'Назва',
    'establishmentForm.namePlaceholder': 'Введіть назву закладу',
    'establishmentForm.addressLabel': 'Адреса',
    'establishmentForm.addressPlaceholder': 'Введіть адресу',
    'establishmentForm.contactNameLabel': 'Ім\'я контактної особи',
    'establishmentForm.contactNamePlaceholder': 'Введіть ім\'я контактної особи',
    'establishmentForm.contactPhoneLabel': 'Телефон контактної особи',
    'establishmentForm.contactPhonePlaceholder': 'Введіть телефон контактної особи',
    'establishmentForm.contactEmailLabel': 'Email контактної особи',
    'establishmentForm.contactEmailPlaceholder': 'Введіть email контактної особи',
    'establishmentForm.notesLabel': 'Примітки',
    'establishmentForm.notesPlaceholder': 'Введіть примітки (необов\'язково)',
    'establishmentForm.saveButton': 'Зберегти',
    'establishmentForm.cancelButton': 'Скасувати',
    'establishmentForm.success': 'Заклад успішно збережено',
    'establishmentForm.updateSuccess': 'Заклад успішно оновлено',
    'establishmentForm.updateError': 'Помилка оновлення закладу',
    
    // Transactions
    'transactions.title': 'Транзакції',
    'transactions.subtitle': 'Управління доставками та платежами білтонгу',
    'transactions.add': 'Записати транзакцію',
    'transactions.search': 'Пошук транзакцій...',
    'transactions.date': 'Дата',
    'transactions.establishment': 'Заклад',
    'transactions.type': 'Тип',
    'transactions.amount': 'Сума',
    'transactions.notes': 'Примітки',
    'transactions.delivery': 'Доставка',
    'transactions.payment': 'Платіж',
    'transactions.noTransactions': 'Транзакції не знайдено',
    'transactions.adjustFilters': 'Спробуйте налаштувати фільтри, щоб побачити більше результатів',
    'transactions.noTransactionsYet': 'Ви ще не записали жодної транзакції',
    'transactions.allTypes': 'Всі типи',
    'transactions.deliveries': 'Доставки',
    'transactions.payments': 'Платежі',
    'transactions.addNew': 'Додати нову транзакцію',
    'transactions.actions': 'Дії',
    'transactions.deleteConfirm': 'Ви впевнені, що хочете видалити цю транзакцію?',
    'transactions.deleteSuccess': 'Транзакцію успішно видалено',
    'transactions.deleteError': 'Помилка видалення транзакції',
    'transactions.dateRange': 'Діапазон дат',
    'transactions.from': 'Від',
    'transactions.to': 'До',
    'transactions.filter': 'Фільтрувати',
    'transactions.clearFilters': 'Очистити фільтри',
    'transactions.all': 'Усі',
    'transactions.paymentStatusPaid': 'Оплачено одразу',
    'transactions.paymentStatusCredit': 'Кредит (Буде оплачено пізніше)',
    
    // Transaction Form
    'transactionForm.title': 'Записати нову транзакцію',
    'transactionForm.establishment': 'Заклад',
    'transactionForm.selectEstablishment': 'Виберіть заклад',
    'transactionForm.type': 'Тип транзакції',
    'transactionForm.selectType': 'Виберіть тип транзакції',
    'transactionForm.amount': 'Сума (ГРН)',
    'transactionForm.enterAmount': 'Введіть суму',
    'transactionForm.date': 'Дата',
    'transactionForm.pickDate': 'Виберіть дату',
    'transactionForm.notes': 'Примітки (Необов\'язково)',
    'transactionForm.additionalNotes': 'Введіть будь-які додаткові примітки',
    'transactionForm.save': 'Записати транзакцію',
    'transactionForm.success': 'Транзакцію успішно записано',
    'transactionForm.error': 'Не вдалося зберегти транзакцію',
    'transactionForm.back': 'Назад до транзакцій',
    'transactionForm.employee': 'Працівник',
    'transactionForm.selectEmployee': 'Вибрати працівника',
    'transactionForm.paymentStatus': 'Статус оплати',
    'transactionForm.selectPaymentStatus': 'Вибрати статус оплати',
    'transactionForm.paymentStatusPaid': 'Оплачено одразу',
    'transactionForm.paymentStatusCredit': 'Кредит (Буде оплачено пізніше)',
    
    // Employees
    'employees.title': 'Співробітники',
    'employees.subtitle': 'Управління членами вашої команди',
    'employees.add': 'Додати співробітника',
    'employees.addNew': 'Додати нового співробітника',
    'employees.editEmployee': 'Редагувати співробітника',
    'employees.search': 'Пошук співробітників...',
    'employees.backToEmployees': 'Назад до списку співробітників',
    'employees.noEmployees': 'Співробітників не знайдено',
    'employees.employeeNumber': 'Номер співробітника',
    'employees.name': 'Ім\'я',
    'employees.email': 'Email',
    'employees.mobile': 'Мобільний',
    'employees.phone': 'Телефон',
    'employees.phoneOptional': 'Телефон (необов\'язково)',
    'employees.address': 'Адреса',
    'employees.notes': 'Примітки',
    'employees.notesOptional': 'Примітки (необов\'язково)',
    'employees.actions': 'Дії',
    'employees.enterName': 'Введіть ім\'я співробітника',
    'employees.enterEmail': 'Введіть email адресу',
    'employees.enterMobile': 'Введіть номер мобільного',
    'employees.enterPhone': 'Введіть номер телефону',
    'employees.enterAddress': 'Введіть адресу',
    'employees.enterNotes': 'Додайте будь-які додаткові примітки тут',
    'employees.autoGenerated': 'Автоматично згенеровано',
    'employees.deleteTitle': 'Видалити співробітника',
    'employees.deleteConfirmation': 'Ви впевнені, що хочете видалити цього співробітника? Цю дію неможливо скасувати.',
    'employees.deleteConfirm': 'Ви впевнені, що хочете видалити цього співробітника?',
    'employees.deleteSuccess': 'Співробітника успішно видалено',
    'employees.deleteError': 'Не вдалося видалити співробітника',
    'employees.updateSuccess': 'Співробітника успішно оновлено',
    'employees.addSuccess': 'Співробітника успішно додано',
    'employees.saveError': 'Не вдалося зберегти співробітника',
    'employees.idNotProvided': 'ID співробітника не надано',
    'employees.notFound': 'Співробітника не знайдено',
    'employees.viewDetails': 'Переглянути деталі',
    'employees.detailsTitle': 'Деталі співробітника',
    'employees.contactInfo': 'Контактна інформація',
    
    // Employee Form
    'employeeForm.title': 'Додати співробітника',
    'employeeForm.editTitle': 'Редагувати співробітника',
    'employeeForm.nameLabel': 'Ім\'я',
    'employeeForm.namePlaceholder': 'Введіть ім\'я співробітника',
    'employeeForm.emailLabel': 'Email',
    'employeeForm.emailPlaceholder': 'Введіть email адресу',
    'employeeForm.mobileLabel': 'Мобільний',
    'employeeForm.mobilePlaceholder': 'Введіть номер мобільного',
    'employeeForm.phoneLabel': 'Телефон (Необов\'язково)',
    'employeeForm.phonePlaceholder': 'Введіть номер телефону',
    'employeeForm.addressLabel': 'Адреса',
    'employeeForm.addressPlaceholder': 'Введіть адресу',
    'employeeForm.notesLabel': 'Примітки (Необов\'язково)',
    'employeeForm.notesPlaceholder': 'Введіть будь-які додаткові примітки',
    'employeeForm.saveButton': 'Зберегти співробітника',
    'employeeForm.cancelButton': 'Скасувати',
    'employeeForm.success': 'Співробітника успішно збережено',
    'employeeForm.error': 'Помилка збереження співробітника',
    'employeeForm.updateSuccess': 'Співробітника успішно оновлено',
    'employeeForm.updateError': 'Помилка оновлення співробітника',
    'employeeForm.back': 'Назад до співробітників',
    
    // Products
    'products.title': 'Товари',
    'products.subtitle': 'Управління вашим інвентарем',
    'products.add': 'Додати товар',
    'products.search': 'Пошук товарів...',
    'products.available': 'Доступні',
    'products.lowStock': 'Низький запас',
    'products.empty': 'Список порожній!',
    'products.emptyDesc': 'Додайте деякі товари, щоб побачити їх тут.',
    'products.noLowStock': 'Немає товарів з низьким запасом',
    'products.adequateStock': 'Всі ваші товари мають достатній рівень запасів.',
    'products.inStock': 'В наявності',
    'products.price': 'Ціна',
    'products.addNew': 'Додати новий товар',
    'products.id': 'ID',
    'products.name': 'Назва',
    'products.category': 'Категорія',
    'products.stock': 'Запас',
    'products.actions': 'Дії',
    'products.noProducts': 'Товари не знайдено',
    'products.deleteConfirm': 'Ви впевнені, що хочете видалити цей товар?',
    'products.deleteSuccess': 'Товар успішно видалено',
    'products.deleteError': 'Помилка видалення товару',
    'products.viewDetails': 'Переглянути деталі',
    'products.editProduct': 'Редагувати товар',
    'products.backToProducts': 'Назад до товарів',
    'products.outOfStock': 'Немає в наявності',
    
    // Product Form
    'productForm.addTitle': 'Додати новий товар',
    'productForm.back': 'Назад до товарів',
    'productForm.productId': 'ID товару',
    'productForm.date': 'Дата',
    'productForm.title': 'Назва',
    'productForm.description': 'Опис',
    'productForm.category': 'Категорія',
    'productForm.selectCategory': 'Виберіть категорію',
    'productForm.newCategory': 'Нова категорія',
    'productForm.quantity': 'Кількість',
    'productForm.lowStockLimit': 'Ліміт низького запасу',
    'productForm.sellingUnitPrice': 'Ціна продажу за одиницю (ГРН)',
    'productForm.buyingUnitPrice': 'Закупівельна ціна за одиницю (ГРН)',
    'productForm.totalSellingPrice': 'Загальна ціна продажу',
    'productForm.saveProduct': 'Зберегти товар',
    'productForm.success': 'Товар успішно додано!',
    'productForm.error': 'Не вдалося зберегти товар',
    'productForm.editTitle': 'Редагувати товар',
    'productForm.productIdLabel': 'ID товару',
    'productForm.productIdPlaceholder': 'Введіть ID товару',
    'productForm.titleLabel': 'Назва',
    'productForm.titlePlaceholder': 'Введіть назву товару',
    'productForm.descriptionLabel': 'Опис',
    'productForm.descriptionPlaceholder': 'Введіть опис товару',
    'productForm.categoryLabel': 'Категорія',
    'productForm.categoryPlaceholder': 'Виберіть категорію товару',
    'productForm.quantityLabel': 'Кількість',
    'productForm.quantityPlaceholder': 'Введіть кількість',
    'productForm.lowStockLimitLabel': 'Ліміт низького запасу',
    'productForm.lowStockLimitPlaceholder': 'Введіть поріг низького запасу',
    'productForm.sellingPriceLabel': 'Ціна продажу',
    'productForm.sellingPricePlaceholder': 'Введіть ціну продажу',
    'productForm.buyingPriceLabel': 'Закупівельна ціна',
    'productForm.buyingPricePlaceholder': 'Введіть закупівельну ціну',
    'productForm.saveButton': 'Зберегти',
    'productForm.cancelButton': 'Скасувати',
    'productForm.updateSuccess': 'Товар успішно оновлено',
    'productForm.updateError': 'Помилка оновлення товару',
    
    // Auth
    'auth.title': 'Автентифікація',
    'auth.subtitle': 'Увійдіть або зареєструйтеся у своєму обліковому записі',
    'auth.login': 'Увійти',
    'auth.register': 'Зареєструватися',
    'auth.email': 'Електронна пошта',
    'auth.password': 'Пароль',
    'auth.confirmPassword': 'Підтвердіть пароль',
    'auth.processing': 'Обробка...',
    'auth.loginSuccess': 'Вхід успішний',
    'auth.loginSuccessDesc': 'Ви успішно увійшли в систему',
    'auth.loginError': 'Помилка входу',
    'auth.loginErrorDesc': 'Перевірте ваші облікові дані та спробуйте знову',
    'auth.registerSuccess': 'Реєстрація успішна',
    'auth.registerSuccessDesc': 'Будь ласка, перевірте вашу електронну пошту для підтвердження',
    'auth.registerError': 'Помилка реєстрації',
    'auth.registerErrorDesc': 'Будь ласка, спробуйте знову або використайте іншу електронну адресу',
  }
};

// Create the context
type LanguageContextType = {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Create the provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Try to get saved language from localStorage, default to English
  const [language, setLanguage] = useState<LanguageType>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as LanguageType) || 'en';
  });

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    const currentTranslations = translations[language];
    return currentTranslations[key as keyof TranslationKeys] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
