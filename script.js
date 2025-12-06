class EmailBuilder {
    constructor() {
        this.components = [];
        this.selectedComponent = null;
        this.history = [];
        this.future = [];
        this.currentTemplate = null;
        this.styles = {
            bgColor: '#f8fafc',
            canvasColor: '#ffffff',
            textColor: '#1e293b',
            primaryColor: '#3b82f6',
            borderRadius: '12px',
            fontFamily: 'Inter, sans-serif',
            contentWidth: '600px'
        };
        this.defaultTemplates = this.createDefaultTemplates();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadStyles();
        this.loadComponents();
        this.updateStyles();
        this.showToast('Email Builder loaded successfully!', 'success');
    }

    createDefaultTemplates() {
        return {
            'empty': [],
            'welcome': this.getWelcomeTemplate(),
            'otp': this.getOtpTemplate(),
            'reset-password': this.getResetPasswordTemplate(),
            'ecommerce': this.getEcommerceTemplate(),
            'subscription': this.getSubscriptionTemplate(),
            'reservation': this.getReservationTemplate(),
            'metrics': this.getMetricsTemplate(),
            'inquiry': this.getInquiryTemplate()
        };
    }

    getWelcomeTemplate() {
        return [
            {
                id: 'welcome-header',
                type: 'header',
                settings: {
                    text: 'Welcome to Our Platform!',
                    alignment: 'center',
                    fontSize: '32px',
                    color: this.styles.textColor,
                    fontFamily: this.styles.fontFamily,
                    padding: '40px 0 20px 0'
                }
            },
            {
                id: 'welcome-subtitle',
                type: 'text',
                settings: {
                    content: "We're excited to have you join our community of amazing users. Get ready to explore features designed just for you!",
                    alignment: 'center',
                    fontSize: '16px',
                    color: '#64748b',
                    lineHeight: '1.6',
                    fontFamily: this.styles.fontFamily,
                    padding: '0 0 30px 0'
                }
            },
            {
                id: 'welcome-divider',
                type: 'divider',
                settings: {
                    color: '#e2e8f0',
                    thickness: '1px',
                    width: '100%',
                    style: 'solid'
                }
            },
            {
                id: 'welcome-button',
                type: 'button',
                settings: {
                    text: 'Get Started',
                    url: '#',
                    bgColor: this.styles.primaryColor,
                    textColor: '#ffffff',
                    alignment: 'center',
                    padding: '14px 32px',
                    fontSize: '16px',
                    borderRadius: this.styles.borderRadius,
                    fontFamily: this.styles.fontFamily
                }
            },
            {
                id: 'welcome-features',
                type: 'text',
                settings: {
                    content: `<div style="text-align: center; padding: 40px 0;">
                        <h3 style="color: ${this.styles.textColor}; margin-bottom: 30px;">What You'll Love</h3>
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;">
                            <div>
                                <div style="font-size: 24px; color: ${this.styles.primaryColor}; margin-bottom: 10px;">🚀</div>
                                <h4 style="color: ${this.styles.textColor}; margin: 0 0 10px 0;">Fast Setup</h4>
                                <p style="color: #64748b; font-size: 14px;">Get started in minutes</p>
                            </div>
                            <div>
                                <div style="font-size: 24px; color: ${this.styles.primaryColor}; margin-bottom: 10px;">🎯</div>
                                <h4 style="color: ${this.styles.textColor}; margin: 0 0 10px 0;">Powerful Tools</h4>
                                <p style="color: #64748b; font-size: 14px;">Everything you need</p>
                            </div>
                            <div>
                                <div style="font-size: 24px; color: ${this.styles.primaryColor}; margin-bottom: 10px;">🛟</div>
                                <h4 style="color: ${this.styles.textColor}; margin: 0 0 10px 0;">24/7 Support</h4>
                                <p style="color: #64748b; font-size: 14px;">Always here to help</p>
                            </div>
                        </div>
                    </div>`,
                    alignment: 'center',
                    fontSize: '16px',
                    color: this.styles.textColor,
                    lineHeight: '1.6',
                    fontFamily: this.styles.fontFamily,
                    padding: '0'
                }
            },
            {
                id: 'welcome-footer',
                type: 'footer',
                settings: {
                    copyrightText: '© 2024 Your Company. All rights reserved.',
                    alignment: 'center',
                    fontSize: '12px',
                    color: '#94a3b8',
                    links: 'Unsubscribe, Privacy Policy, Contact Us',
                    linkColor: this.styles.primaryColor,
                    borderTop: '1px solid #e2e8f0',
                    padding: '30px 0 0 0'
                }
            }
        ];
    }

    getOtpTemplate() {
        return [
            {
                id: 'otp-header',
                type: 'header',
                settings: {
                    text: 'Your One-Time Passcode',
                    alignment: 'center',
                    fontSize: '28px',
                    color: this.styles.textColor,
                    fontFamily: this.styles.fontFamily,
                    padding: '40px 0 20px 0'
                }
            },
            {
                id: 'otp-instruction',
                type: 'text',
                settings: {
                    content: 'Here is your one-time passcode:',
                    alignment: 'center',
                    fontSize: '16px',
                    color: '#64748b',
                    lineHeight: '1.6',
                    fontFamily: this.styles.fontFamily,
                    padding: '0 0 20px 0'
                }
            },
            {
                id: 'otp-code',
                type: 'text',
                settings: {
                    content: `<div style="text-align: center; margin: 20px 0;">
                        <div style="font-family: monospace; font-size: 48px; letter-spacing: 10px; 
                             color: ${this.styles.textColor}; font-weight: 700; padding: 20px; 
                             background: #f1f5f9; border-radius: 12px; display: inline-block;">
                            012345
                        </div>
                    </div>`,
                    alignment: 'center',
                    fontSize: '16px',
                    color: this.styles.textColor,
                    lineHeight: '1.6',
                    fontFamily: this.styles.fontFamily,
                    padding: '0'
                }
            },
            {
                id: 'otp-expiry',
                type: 'text',
                settings: {
                    content: 'This code will expire in 30 minutes.',
                    alignment: 'center',
                    fontSize: '14px',
                    color: '#64748b',
                    lineHeight: '1.6',
                    fontFamily: this.styles.fontFamily,
                    padding: '10px 0 30px 0'
                }
            },
            {
                id: 'otp-help',
                type: 'text',
                settings: {
                    content: `<p style="text-align: center; color: #64748b; font-size: 14px; 
                           padding-top: 30px; border-top: 1px solid #e2e8f0;">
                        Problems? Just reply to this email.
                    </p>`,
                    alignment: 'center',
                    fontSize: '14px',
                    color: '#64748b',
                    lineHeight: '1.6',
                    fontFamily: this.styles.fontFamily,
                    padding: '0'
                }
            }
        ];
    }

    getResetPasswordTemplate() {
        return [
            {
                id: 'reset-header',
                type: 'header',
                settings: {
                    text: 'Reset Your Password',
                    alignment: 'center',
                    fontSize: '28px',
                    color: this.styles.textColor,
                    fontFamily: this.styles.fontFamily,
                    padding: '40px 0 20px 0'
                }
            },
            {
                id: 'reset-instruction',
                type: 'text',
                settings: {
                    content: 'We received a request to reset your password. Click the button below to create a new password.',
                    alignment: 'center',
                    fontSize: '16px',
                    color: '#64748b',
                    lineHeight: '1.6',
                    fontFamily: this.styles.fontFamily,
                    padding: '0 0 30px 0'
                }
            },
            {
                id: 'reset-button',
                type: 'button',
                settings: {
                    text: 'Reset Password',
                    url: '#',
                    bgColor: this.styles.primaryColor,
                    textColor: '#ffffff',
                    alignment: 'center',
                    padding: '14px 32px',
                    fontSize: '16px',
                    borderRadius: this.styles.borderRadius,
                    fontFamily: this.styles.fontFamily
                }
            },
            {
                id: 'reset-expiry',
                type: 'text',
                settings: {
                    content: 'This link will expire in 1 hour.',
                    alignment: 'center',
                    fontSize: '14px',
                    color: '#64748b',
                    lineHeight: '1.6',
                    fontFamily: this.styles.fontFamily,
                    padding: '10px 0 30px 0'
                }
            },
            {
                id: 'reset-security',
                type: 'text',
                settings: {
                    content: `<div style="background: #fef3c7; border-radius: 8px; padding: 20px; margin: 20px 0;">
                        <p style="color: #92400e; margin: 0; font-size: 14px;">
                            <strong>Security Tip:</strong> If you didn't request this password reset, please ignore this email. 
                            Your account remains secure.
                        </p>
                    </div>`,
                    alignment: 'center',
                    fontSize: '14px',
                    color: '#92400e',
                    lineHeight: '1.6',
                    fontFamily: this.styles.fontFamily,
                    padding: '0'
                }
            }
        ];
    }

    getEcommerceTemplate() {
        return [
            {
                id: 'receipt-header',
                type: 'header',
                settings: {
                    text: 'Order Confirmation',
                    alignment: 'center',
                    fontSize: '28px',
                    color: this.styles.textColor,
                    fontFamily: this.styles.fontFamily,
                    padding: '40px 0 20px 0'
                }
            },
            {
                id: 'receipt-thanks',
                type: 'text',
                settings: {
                    content: 'Thank you for your purchase! Here are your order details:',
                    alignment: 'center',
                    fontSize: '16px',
                    color: '#64748b',
                    lineHeight: '1.6',
                    fontFamily: this.styles.fontFamily,
                    padding: '0 0 30px 0'
                }
            },
            {
                id: 'receipt-table',
                type: 'table',
                settings: {
                    rows: [
                        ['Premium Headphones', '1', '$199.99'],
                        ['Carrying Case', '1', '$24.99'],
                        ['Express Shipping', '1', '$14.99']
                    ],
                    header: ['Item', 'Quantity', 'Price'],
                    showTotal: true,
                    totalLabel: 'Total',
                    totalAmount: '$239.97',
                    borderColor: '#e2e8f0'
                }
            },
            {
                id: 'receipt-info',
                type: 'text',
                settings: {
                    content: `<div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                            <div>
                                <h4 style="color: ${this.styles.textColor}; margin: 0 0 10px 0;">Payment Method</h4>
                                <p style="color: #64748b; margin: 0;">Visa ending in 4252</p>
                            </div>
                            <div>
                                <h4 style="color: ${this.styles.textColor}; margin: 0 0 10px 0;">Order Number</h4>
                                <p style="color: #64748b; margin: 0;">#ORD-7890-2024</p>
                            </div>
                        </div>
                    </div>`,
                    alignment: 'left',
                    fontSize: '14px',
                    color: this.styles.textColor,
                    lineHeight: '1.6',
                    fontFamily: this.styles.fontFamily,
                    padding: '0'
                }
            },
            {
                id: 'receipt-button',
                type: 'button',
                settings: {
                    text: 'Track Your Order',
                    url: '#',
                    bgColor: this.styles.primaryColor,
                    textColor: '#ffffff',
                    alignment: 'center',
                    padding: '14px 32px',
                    fontSize: '16px',
                    borderRadius: this.styles.borderRadius,
                    fontFamily: this.styles.fontFamily
                }
            }
        ];
    }

    getSubscriptionTemplate() {
        return [
            {
                id: 'subscription-header',
                type: 'header',
                settings: {
                    text: 'Subscription Receipt',
                    alignment: 'center',
                    fontSize: '28px',
                    color: this.styles.textColor,
                    fontFamily: this.styles.fontFamily,
                    padding: '40px 0 20px 0'
                }
            },
            {
                id: 'subscription-amount',
                type: 'text',
                settings: {
                    content: `<div style="text-align: center; margin: 20px 0;">
                        <div style="font-size: 48px; font-weight: 700; color: ${this.styles.primaryColor};">
                            $99.75
                        </div>
                        <p style="color: #64748b; font-size: 16px; margin-top: 10px;">
                            Paid on August 1, 2024
                        </p>
                    </div>`,
                    alignment: 'center',
                    fontSize: '16px',
                    color: this.styles.textColor,
                    lineHeight: '1.6',
                    fontFamily: this.styles.fontFamily,
                    padding: '0'
                }
            },
            {
                id: 'subscription-details',
                type: 'table',
                settings: {
                    rows: [
                        ['Remix Pro Plan', '5 seats'],
                        ['Billing Period', 'July 10 - August 1'],
                        ['Next Billing Date', 'September 1, 2024']
                    ],
                    header: ['Detail', 'Value'],
                    showTotal: false,
                    borderColor: '#e2e8f0'
                }
            },
            {
                id: 'subscription-button',
                type: 'button',
                settings: {
                    text: 'Download Receipt',
                    url: '#',
                    bgColor: this.styles.primaryColor,
                    textColor: '#ffffff',
                    alignment: 'center',
                    padding: '14px 32px',
                    fontSize: '16px',
                    borderRadius: this.styles.borderRadius,
                    fontFamily: this.styles.fontFamily
                }
            },
            {
                id: 'subscription-help',
                type: 'text',
                settings: {
                    content: `<p style="text-align: center; color: #64748b; font-size: 14px; 
                           padding-top: 30px; border-top: 1px solid #e2e8f0;">
                        Questions about your subscription? <a href="#" style="color: ${this.styles.primaryColor};">Contact support</a>
                    </p>`,
                    alignment: 'center',
                    fontSize: '14px',
                    color: '#64748b',
                    lineHeight: '1.6',
                    fontFamily: this.styles.fontFamily,
                    padding: '0'
                }
            }
        ];
    }

    getReservationTemplate() {
        return [
            {
                id: 'reservation-header',
                type: 'header',
                settings: {
                    text: 'Reservation Reminder',
                    alignment: 'center',
                    fontSize: '28px',
                    color: this.styles.textColor,
                    fontFamily: this.styles.fontFamily,
                    padding: '40px 0 20px 0'
                }
            },
            {
                id: 'reservation-details',
                type: 'text',
                settings: {
                    content: `<div style="background: #f0f9ff; border-radius: 12px; padding: 25px; margin: 20px 0;">
                        <div style="display: flex; align-items: center; gap: 20px;">
                            <div style="background: white; border-radius: 8px; padding: 15px; text-align: center;">
                                <div style="font-size: 24px; font-weight: 700; color: ${this.styles.primaryColor};">24</div>
                                <div style="font-size: 14px; color: #64748b;">OCT</div>
                            </div>
                            <div>
                                <h3 style="color: ${this.styles.textColor}; margin: 0 0 10px 0;">Dental Check-up</h3>
                                <p style="color: #64748b; margin: 0 0 5px 0;">
                                    <strong>Time:</strong> 2:30 PM - 3:30 PM
                                </p>
                                <p style="color: #64748b; margin: 0;">
                                    <strong>Doctor:</strong> Dr. Sarah Johnson
                                </p>
                            </div>
                        </div>
                    </div>`,
                    alignment: 'left',
                    fontSize: '16px',
                    color: this.styles.textColor,
                    lineHeight: '1.6',
                    fontFamily: this.styles.fontFamily,
                    padding: '0'
                }
            },
            {
                id: 'reservation-actions',
                type: 'text',
                settings: {
                    content: `<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 20px 0;">
                        <button style="background: ${this.styles.primaryColor}; color: white; border: none; 
                               padding: 12px; border-radius: 8px; cursor: pointer; font-weight: 600;">
                            Confirm
                        </button>
                        <button style="background: #f1f5f9; color: ${this.styles.textColor}; border: none; 
                               padding: 12px; border-radius: 8px; cursor: pointer; font-weight: 600;">
                            Reschedule
                        </button>
                        <button style="background: #fee2e2; color: #dc2626; border: none; 
                               padding: 12px; border-radius: 8px; cursor: pointer; font-weight: 600;">
                            Cancel
                        </button>
                    </div>`,
                    alignment: 'center',
                    fontSize: '16px',
                    color: this.styles.textColor,
                    lineHeight: '1.6',
                    fontFamily: this.styles.fontFamily,
                    padding: '0'
                }
            },
            {
                id: 'reservation-instructions',
                type: 'text',
                settings: {
                    content: `<div style="background: #fef3c7; border-radius: 8px; padding: 20px; margin: 20px 0;">
                        <p style="color: #92400e; margin: 0; font-size: 14px;">
                            <strong>Please arrive 15 minutes early.</strong> Bring your insurance card and ID.
                        </p>
                    </div>`,
                    alignment: 'left',
                    fontSize: '14px',
                    color: '#92400e',
                    lineHeight: '1.6',
                    fontFamily: this.styles.fontFamily,
                    padding: '0'
                }
            }
        ];
    }

    getMetricsTemplate() {
        return [
            {
                id: 'metrics-header',
                type: 'header',
                settings: {
                    text: 'Weekly Performance Report',
                    alignment: 'center',
                    fontSize: '28px',
                    color: this.styles.textColor,
                    fontFamily: this.styles.fontFamily,
                    padding: '40px 0 20px 0'
                }
            },
            {
                id: 'metrics-stats',
                type: 'text',
                settings: {
                    content: `<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin: 20px 0;">
                        <div style="background: ${this.styles.primaryColor}; color: white; border-radius: 8px; 
                             padding: 15px; text-align: center;">
                            <div style="font-size: 24px; font-weight: 700;">4.2K</div>
                            <div style="font-size: 12px; opacity: 0.9;">Impressions</div>
                        </div>
                        <div style="background: #10b981; color: white; border-radius: 8px; 
                             padding: 15px; text-align: center;">
                            <div style="font-size: 24px; font-weight: 700;">892</div>
                            <div style="font-size: 12px; opacity: 0.9;">Engagements</div>
                        </div>
                        <div style="background: #8b5cf6; color: white; border-radius: 8px; 
                             padding: 15px; text-align: center;">
                            <div style="font-size: 24px; font-weight: 700;">167</div>
                            <div style="font-size: 12px; opacity: 0.9;">New Followers</div>
                        </div>
                        <div style="background: #f59e0b; color: white; border-radius: 8px; 
                             padding: 15px; text-align: center;">
                            <div style="font-size: 24px; font-weight: 700;">21.2%</div>
                            <div style="font-size: 12px; opacity: 0.9;">Engagement Rate</div>
                        </div>
                    </div>`,
                    alignment: 'center',
                    fontSize: '16px',
                    color: this.styles.textColor,
                    lineHeight: '1.6',
                    fontFamily: this.styles.fontFamily,
                    padding: '0'
                }
            },
            {
                id: 'metrics-top-content',
                type: 'text',
                settings: {
                    content: `<div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0;">
                        <h3 style="color: ${this.styles.textColor}; margin: 0 0 15px 0;">Top Performing Content</h3>
                        <div style="display: flex; justify-content: space-between; align-items: center; 
                             padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                            <span>Behind the Scenes: Product Launch</span>
                            <span style="font-weight: 600;">1.4K views</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; 
                             padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                            <span>Industry Insights: Q4 Trends</span>
                            <span style="font-weight: 600;">2.8K impressions</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; 
                             padding: 10px 0;">
                            <span>Customer Success Story</span>
                            <span style="font-weight: 600;">3.1K views</span>
                        </div>
                    </div>`,
                    alignment: 'left',
                    fontSize: '14px',
                    color: this.styles.textColor,
                    lineHeight: '1.6',
                    fontFamily: this.styles.fontFamily,
                    padding: '0'
                }
            },
            {
                id: 'metrics-button',
                type: 'button',
                settings: {
                    text: 'View Detailed Analytics',
                    url: '#',
                    bgColor: this.styles.primaryColor,
                    textColor: '#ffffff',
                    alignment: 'center',
                    padding: '14px 32px',
                    fontSize: '16px',
                    borderRadius: this.styles.borderRadius,
                    fontFamily: this.styles.fontFamily
                }
            }
        ];
    }

    getInquiryTemplate() {
        return [
            {
                id: 'inquiry-header',
                type: 'header',
                settings: {
                    text: 'Re: Your Inquiry',
                    alignment: 'center',
                    fontSize: '28px',
                    color: this.styles.textColor,
                    fontFamily: this.styles.fontFamily,
                    padding: '40px 0 20px 0'
                }
            },
            {
                id: 'inquiry-response',
                type: 'text',
                settings: {
                    content: `<div style="background: #f0f9ff; border-radius: 12px; padding: 25px; margin: 20px 0;">
                        <p style="color: ${this.styles.textColor}; margin: 0 0 15px 0;">
                            <strong>Hi there,</strong>
                        </p>
                        <p style="color: ${this.styles.textColor}; margin: 0 0 15px 0;">
                            Thank you for reaching out to us. We've received your inquiry about billing questions and 
                            one of our support specialists will get back to you within 24 hours.
                        </p>
                        <p style="color: ${this.styles.textColor}; margin: 0;">
                            <strong>Ticket Number:</strong> SUP-7890-2024
                        </p>
                    </div>`,
                    alignment: 'left',
                    fontSize: '16px',
                    color: this.styles.textColor,
                    lineHeight: '1.6',
                    fontFamily: this.styles.fontFamily,
                    padding: '0'
                }
            },
            {
                id: 'inquiry-next-steps',
                type: 'text',
                settings: {
                    content: `<div style="margin: 20px 0;">
                        <h3 style="color: ${this.styles.textColor}; margin: 0 0 15px 0;">Next Steps:</h3>
                        <ol style="color: ${this.styles.textColor}; padding-left: 20px; margin: 0;">
                            <li>Our team will review your inquiry</li>
                            <li>We'll contact you with a solution</li>
                            <li>You'll receive updates via email</li>
                        </ol>
                    </div>`,
                    alignment: 'left',
                    fontSize: '14px',
                    color: this.styles.textColor,
                    lineHeight: '1.6',
                    fontFamily: this.styles.fontFamily,
                    padding: '0'
                }
            },
            {
                id: 'inquiry-help',
                type: 'text',
                settings: {
                    content: `<div style="background: #fef3c7; border-radius: 8px; padding: 20px; margin: 20px 0;">
                        <p style="color: #92400e; margin: 0; font-size: 14px;">
                            <strong>Need immediate help?</strong> Visit our <a href="#" style="color: #92400e;">Help Center</a> 
                            or call us at 1-800-123-4567.
                        </p>
                    </div>`,
                    alignment: 'left',
                    fontSize: '14px',
                    color: '#92400e',
                    lineHeight: '1.6',
                    fontFamily: this.styles.fontFamily,
                    padding: '0'
                }
            }
        ];
    }

    setupEventListeners() {
        // Template selection
        document.querySelectorAll('.template-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.loadTemplate(e.currentTarget.dataset.template);
            });
        });

        // Drag and drop
        document.querySelectorAll('.component-item').forEach(item => {
            item.addEventListener('dragstart', this.handleDragStart.bind(this));
        });

        const canvas = document.getElementById('emailCanvas');
        canvas.addEventListener('dragover', this.handleDragOver.bind(this));
        canvas.addEventListener('drop', this.handleDrop.bind(this));
        canvas.addEventListener('dragenter', this.handleDragEnter.bind(this));
        canvas.addEventListener('dragleave', this.handleDragLeave.bind(this));

        // Button actions
        document.getElementById('previewBtn').addEventListener('click', () => this.showPreview());
        document.getElementById('exportBtn').addEventListener('click', () => this.exportHTML());
        document.getElementById('exportJsonBtn').addEventListener('click', () => this.exportJSON());
        document.getElementById('saveBtn').addEventListener('click', () => this.saveTemplate());
        document.getElementById('copyBtn').addEventListener('click', () => this.copyHTML());
        document.getElementById('clearCanvas').addEventListener('click', () => this.clearCanvas());
        document.getElementById('undoBtn').addEventListener('click', () => this.undo());
        document.getElementById('redoBtn').addEventListener('click', () => this.redo());
        document.getElementById('duplicateBtn').addEventListener('click', () => this.duplicateSelected());
        document.getElementById('applyStyles').addEventListener('click', () => this.applyStyles());
        document.getElementById('copyCodeBtn').addEventListener('click', () => this.copyToClipboard('htmlCode'));
        document.getElementById('copyJsonBtn').addEventListener('click', () => this.copyToClipboard('jsonCode'));
        document.getElementById('downloadHtmlBtn').addEventListener('click', () => this.downloadHTML());
        document.getElementById('downloadJsonBtn').addEventListener('click', () => this.downloadJSON());

        // Modal close buttons
        document.querySelectorAll('.modal .close').forEach(closeBtn => {
            closeBtn.addEventListener('click', () => {
                closeBtn.closest('.modal').style.display = 'none';
            });
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });

        // Style inputs
        this.setupStyleInputs();
    }

    setupStyleInputs() {
        const styleInputs = ['bgColor', 'canvasColor', 'textColor', 'primaryColor'];
        styleInputs.forEach(inputId => {
            const colorInput = document.getElementById(inputId);
            const textInput = document.getElementById(inputId + 'Text');
            
            colorInput.addEventListener('input', (e) => {
                textInput.value = e.target.value;
            });
            
            textInput.addEventListener('input', (e) => {
                const color = e.target.value;
                if (this.isValidColor(color)) {
                    colorInput.value = color;
                }
            });
        });
    }

    isValidColor(color) {
        const s = new Option().style;
        s.color = color;
        return s.color !== '';
    }

    loadTemplate(templateName) {
        // Update active template in UI
        document.querySelectorAll('.template-item').forEach(item => {
            item.classList.remove('active');
        });
        const selectedTemplate = document.querySelector(`[data-template="${templateName}"]`);
        if (selectedTemplate) {
            selectedTemplate.classList.add('active');
        }

        this.currentTemplate = templateName;
        
        // Load template components
        if (templateName === 'empty') {
            this.components = [];
        } else {
            this.components = JSON.parse(JSON.stringify(this.defaultTemplates[templateName]));
            // Apply current styles to template
            this.components.forEach(component => {
                if (component.type === 'button' && component.settings.bgColor) {
                    component.settings.bgColor = this.styles.primaryColor;
                }
                if (component.settings.color && component.settings.color.startsWith('#')) {
                    component.settings.color = this.styles.textColor;
                }
                if (component.settings.fontFamily) {
                    component.settings.fontFamily = this.styles.fontFamily;
                }
                if (component.settings.borderRadius) {
                    component.settings.borderRadius = this.styles.borderRadius;
                }
            });
        }

        this.saveHistory();
        this.saveComponents();
        this.renderCanvas();
        
        this.showToast(`${templateName.replace('-', ' ')} template loaded!`, 'success');
    }

    loadStyles() {
        const saved = localStorage.getItem('emailBuilderStyles');
        if (saved) {
            try {
                this.styles = JSON.parse(saved);
                this.updateStyleInputs();
            } catch (e) {
                console.error('Error loading styles:', e);
            }
        }
    }

    updateStyleInputs() {
        document.getElementById('bgColor').value = this.styles.bgColor;
        document.getElementById('bgColorText').value = this.styles.bgColor;
        document.getElementById('canvasColor').value = this.styles.canvasColor;
        document.getElementById('canvasColorText').value = this.styles.canvasColor;
        document.getElementById('textColor').value = this.styles.textColor;
        document.getElementById('textColorText').value = this.styles.textColor;
        document.getElementById('primaryColor').value = this.styles.primaryColor;
        document.getElementById('primaryColorText').value = this.styles.primaryColor;
        document.getElementById('borderRadius').value = this.styles.borderRadius;
        document.getElementById('fontFamily').value = this.styles.fontFamily;
        document.getElementById('contentWidth').value = this.styles.contentWidth;
    }

    applyStyles() {
        this.styles = {
            bgColor: document.getElementById('bgColor').value,
            canvasColor: document.getElementById('canvasColor').value,
            textColor: document.getElementById('textColor').value,
            primaryColor: document.getElementById('primaryColor').value,
            borderRadius: document.getElementById('borderRadius').value,
            fontFamily: document.getElementById('fontFamily').value,
            contentWidth: document.getElementById('contentWidth').value
        };
        
        localStorage.setItem('emailBuilderStyles', JSON.stringify(this.styles));
        this.updateStyles();
        this.renderCanvas();
        
        this.showToast('Styles applied successfully!', 'success');
    }

    updateStyles() {
        document.body.style.backgroundColor = this.styles.bgColor;
        document.getElementById('emailCanvas').style.backgroundColor = this.styles.bgColor;
    }

    loadComponents() {
        const saved = localStorage.getItem('emailComponents');
        if (saved) {
            try {
                this.components = JSON.parse(saved);
                this.renderCanvas();
            } catch (e) {
                console.error('Error loading components:', e);
            }
        }
    }

    saveComponents() {
        localStorage.setItem('emailComponents', JSON.stringify(this.components));
        this.saveHistory();
    }

    saveHistory() {
        this.history.push({
            components: JSON.parse(JSON.stringify(this.components)),
            template: this.currentTemplate,
            timestamp: Date.now()
        });
        this.future = [];
        
        // Limit history to 20 entries
        if (this.history.length > 20) {
            this.history.shift();
        }
    }

    handleDragStart(e) {
        e.dataTransfer.setData('type', e.target.dataset.type);
        e.dataTransfer.setData('text/plain', e.target.dataset.type);
    }

    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }

    handleDragEnter(e) {
        e.preventDefault();
        if (e.target.classList.contains('email-canvas') || 
            e.target.classList.contains('empty-state')) {
            e.target.classList.add('drag-over');
        }
    }

    handleDragLeave(e) {
        if (e.target.classList.contains('email-canvas') || 
            e.target.classList.contains('empty-state')) {
            e.target.classList.remove('drag-over');
        }
    }

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Remove drag-over class
        document.querySelectorAll('.drag-over').forEach(el => {
            el.classList.remove('drag-over');
        });

        const type = e.dataTransfer.getData('type');
        if (!type) return;

        const component = this.createComponent(type);
        if (component) {
            this.components.push(component);
            this.saveComponents();
            this.renderCanvas();
            
            this.showToast(`${type} component added!`, 'success');
        }
    }

    createComponent(type) {
        const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        
        const baseComponent = {
            id,
            type,
            settings: {}
        };

        switch(type) {
            case 'header':
                return {
                    ...baseComponent,
                    settings: {
                        text: 'New Header',
                        alignment: 'center',
                        fontSize: '24px',
                        color: this.styles.textColor,
                        fontFamily: this.styles.fontFamily,
                        padding: '20px 0'
                    }
                };
            case 'text':
                return {
                    ...baseComponent,
                    settings: {
                        content: 'Add your text here. You can edit this by selecting the component and changing its properties.',
                        alignment: 'left',
                        fontSize: '16px',
                        color: this.styles.textColor,
                        lineHeight: '1.6',
                        fontFamily: this.styles.fontFamily,
                        padding: '10px 0'
                    }
                };
            case 'image':
                return {
                    ...baseComponent,
                    settings: {
                        src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80',
                        alt: 'Sample Image',
                        width: '100%',
                        alignment: 'center',
                        linkUrl: '',
                        border: 'none',
                        borderRadius: '8px'
                    }
                };
            case 'button':
                return {
                    ...baseComponent,
                    settings: {
                        text: 'Click Here',
                        url: '#',
                        bgColor: this.styles.primaryColor,
                        textColor: '#ffffff',
                        alignment: 'center',
                        padding: '12px 24px',
                        fontSize: '16px',
                        borderRadius: this.styles.borderRadius,
                        fontFamily: this.styles.fontFamily
                    }
                };
            case 'divider':
                return {
                    ...baseComponent,
                    settings: {
                        color: '#e2e8f0',
                        thickness: '1px',
                        width: '100%',
                        style: 'solid'
                    }
                };
            case 'footer':
                return {
                    ...baseComponent,
                    settings: {
                        copyrightText: '© 2024 Your Company. All rights reserved.',
                        alignment: 'center',
                        fontSize: '12px',
                        color: '#94a3b8',
                        links: 'Unsubscribe, Privacy Policy, Contact Us',
                        linkColor: this.styles.primaryColor,
                        borderTop: '1px solid #e2e8f0',
                        padding: '20px 0 0 0'
                    }
                };
            case 'table':
                return {
                    ...baseComponent,
                    settings: {
                        rows: [
                            ['Item 1', '1', '$10.00'],
                            ['Item 2', '2', '$20.00']
                        ],
                        header: ['Item', 'Quantity', 'Price'],
                        showTotal: true,
                        totalLabel: 'Total',
                        totalAmount: '$30.00',
                        borderColor: '#e2e8f0'
                    }
                };
            case 'icon':
                return {
                    ...baseComponent,
                    settings: {
                        icon: 'fas fa-check-circle',
                        size: '48px',
                        color: this.styles.primaryColor,
                        alignment: 'center',
                        linkUrl: ''
                    }
                };
            case 'social':
                return {
                    ...baseComponent,
                    settings: {
                        platforms: ['facebook', 'twitter', 'instagram', 'linkedin'],
                        size: '24px',
                        color: this.styles.primaryColor,
                        alignment: 'center',
                        spacing: '15px'
                    }
                };
            default:
                return null;
        }
    }

    renderCanvas() {
        const canvas = document.getElementById('emailCanvas');
        
        if (this.components.length === 0) {
            canvas.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-mouse-pointer"></i>
                    <p>Select a template or drag components to start building</p>
                </div>
            `;
            return;
        }

        // Create canvas wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'canvas-wrapper';
        wrapper.style.backgroundColor = this.styles.canvasColor;
        wrapper.style.maxWidth = this.styles.contentWidth;
        wrapper.style.width = '100%';
        
        // Add components
        this.components.forEach((component, index) => {
            const componentEl = this.createComponentElement(component, index);
            wrapper.appendChild(componentEl);
        });

        canvas.innerHTML = '';
        canvas.appendChild(wrapper);
    }

    createComponentElement(component, index) {
        const div = document.createElement('div');
        div.className = 'email-component';
        div.dataset.id = component.id;
        div.dataset.index = index;

        let content = '';
        switch(component.type) {
            case 'header':
                content = `
                    <h2 style="text-align: ${component.settings.alignment}; 
                               color: ${component.settings.color}; 
                               font-size: ${component.settings.fontSize}; 
                               font-family: ${component.settings.fontFamily};
                               padding: ${component.settings.padding};
                               margin: 0;">
                        ${component.settings.text}
                    </h2>
                `;
                break;
            case 'text':
                content = `
                    <div style="text-align: ${component.settings.alignment}; 
                                color: ${component.settings.color}; 
                                font-size: ${component.settings.fontSize}; 
                                line-height: ${component.settings.lineHeight};
                                font-family: ${component.settings.fontFamily};
                                padding: ${component.settings.padding};">
                        ${component.settings.content}
                    </div>
                `;
                break;
            case 'image':
                const imgTag = `
                    <img src="${component.settings.src}" 
                         alt="${component.settings.alt}" 
                         style="width: ${component.settings.width}; 
                                max-width: 100%; 
                                height: auto;
                                border: ${component.settings.border};
                                border-radius: ${component.settings.borderRadius};">
                `;
                
                content = `
                    <div style="text-align: ${component.settings.alignment};">
                        ${component.settings.linkUrl ? 
                            `<a href="${component.settings.linkUrl}" target="_blank">${imgTag}</a>` : 
                            imgTag}
                    </div>
                `;
                break;
            case 'button':
                content = `
                    <div style="text-align: ${component.settings.alignment};">
                        <a href="${component.settings.url}" 
                           style="background-color: ${component.settings.bgColor}; 
                                  color: ${component.settings.textColor}; 
                                  padding: ${component.settings.padding}; 
                                  text-decoration: none; 
                                  display: inline-block; 
                                  border-radius: ${component.settings.borderRadius}; 
                                  font-family: ${component.settings.fontFamily};
                                  font-size: ${component.settings.fontSize};
                                  font-weight: 600;">
                            ${component.settings.text}
                        </a>
                    </div>
                `;
                break;
            case 'divider':
                content = `
                    <div style="width: ${component.settings.width}; 
                                border-bottom: ${component.settings.thickness} ${component.settings.style || 'solid'} ${component.settings.color}; 
                                margin: 20px auto;">
                    </div>
                `;
                break;
            case 'footer':
                const links = component.settings.links.split(',').map(link => 
                    `<a href="#" style="color: ${component.settings.linkColor}; text-decoration: none; margin: 0 5px;">${link.trim()}</a>`
                ).join(' | ');
                
                content = `
                    <div style="text-align: ${component.settings.alignment}; 
                                color: ${component.settings.color}; 
                                font-size: ${component.settings.fontSize}; 
                                font-family: ${this.styles.fontFamily}; 
                                padding: ${component.settings.padding}; 
                                border-top: ${component.settings.borderTop};">
                        <p style="margin: 0 0 10px 0;">${component.settings.copyrightText}</p>
                        ${component.settings.links ? 
                            `<div style="font-size: 11px; margin-top: 10px;">${links}</div>` : 
                            ''}
                    </div>
                `;
                break;
            case 'table':
                let tableHTML = `
                    <table style="width: 100%; border-collapse: collapse; font-family: ${this.styles.fontFamily}; margin: 20px 0;">
                `;
                
                if (component.settings.header && component.settings.header.length > 0) {
                    tableHTML += '<thead><tr>';
                    component.settings.header.forEach(cell => {
                        tableHTML += `<th style="text-align: left; padding: 12px; border-bottom: 2px solid ${component.settings.borderColor}; 
                                       color: ${this.styles.textColor}; font-weight: 600;">${cell}</th>`;
                    });
                    tableHTML += '</tr></thead>';
                }
                
                tableHTML += '<tbody>';
                component.settings.rows.forEach((row, rowIndex) => {
                    tableHTML += '<tr>';
                    row.forEach(cell => {
                        tableHTML += `<td style="padding: 12px; border-bottom: ${rowIndex === component.settings.rows.length - 1 && !component.settings.showTotal ? 'none' : `1px solid ${component.settings.borderColor}`}; 
                                       color: ${this.styles.textColor};">${cell}</td>`;
                    });
                    tableHTML += '</tr>';
                });
                tableHTML += '</tbody>';
                
                if (component.settings.showTotal) {
                    const colspan = component.settings.header ? component.settings.header.length - 1 : 1;
                    tableHTML += `
                        <tfoot>
                            <tr>
                                <td style="padding: 12px; font-weight: 600; color: ${this.styles.textColor};" colspan="${colspan}">
                                    ${component.settings.totalLabel}
                                </td>
                                <td style="padding: 12px; font-weight: 600; color: ${this.styles.textColor};">
                                    ${component.settings.totalAmount}
                                </td>
                            </tr>
                        </tfoot>
                    `;
                }
                
                tableHTML += '</table>';
                content = tableHTML;
                break;
            case 'icon':
                content = `
                    <div style="text-align: ${component.settings.alignment};">
                        ${component.settings.linkUrl ? 
                            `<a href="${component.settings.linkUrl}" target="_blank">` : ''}
                        <i class="${component.settings.icon}" style="font-size: ${component.settings.size}; color: ${component.settings.color};"></i>
                        ${component.settings.linkUrl ? '</a>' : ''}
                    </div>
                `;
                break;
            case 'social':
                const socialIcons = {
                    facebook: { class: 'fab fa-facebook-f', color: '#1877F2' },
                    twitter: { class: 'fab fa-twitter', color: '#1DA1F2' },
                    instagram: { class: 'fab fa-instagram', color: '#E4405F' },
                    linkedin: { class: 'fab fa-linkedin-in', color: '#0A66C2' },
                    youtube: { class: 'fab fa-youtube', color: '#FF0000' },
                    github: { class: 'fab fa-github', color: '#181717' }
                };
                
                const iconsHTML = component.settings.platforms.map(platform => {
                    const platformData = socialIcons[platform.toLowerCase()];
                    if (!platformData) return '';
                    
                    return `
                        <a href="#" style="margin: 0 ${component.settings.spacing}; 
                           color: ${component.settings.color === 'platform' ? platformData.color : component.settings.color}; 
                           text-decoration: none;">
                            <i class="${platformData.class}" style="font-size: ${component.settings.size};"></i>
                        </a>
                    `;
                }).join('');
                
                content = `
                    <div style="text-align: ${component.settings.alignment};">
                        ${iconsHTML}
                    </div>
                `;
                break;
        }

        div.innerHTML = `
            <div class="component-toolbar">
                <button class="edit-btn" title="Edit"><i class="fas fa-edit"></i></button>
                <button class="delete-btn" title="Delete"><i class="fas fa-trash"></i></button>
                <button class="move-up-btn" title="Move Up"><i class="fas fa-arrow-up"></i></button>
                <button class="move-down-btn" title="Move Down"><i class="fas fa-arrow-down"></i></button>
                <button class="duplicate-btn" title="Duplicate"><i class="fas fa-copy"></i></button>
            </div>
            <div class="component-content">
                ${content}
            </div>
        `;

        // Add event listeners to toolbar buttons
        const toolbar = div.querySelector('.component-toolbar');
        toolbar.querySelector('.edit-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.selectComponent(component.id);
        });

        toolbar.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.deleteComponent(component.id);
        });

        toolbar.querySelector('.move-up-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.moveComponent(index, 'up');
        });

        toolbar.querySelector('.move-down-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.moveComponent(index, 'down');
        });

        toolbar.querySelector('.duplicate-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.duplicateComponent(component.id);
        });

        // Select component on click
        div.addEventListener('click', (e) => {
            if (!e.target.closest('.component-toolbar')) {
                this.selectComponent(component.id);
            }
        });

        return div;
    }

    selectComponent(id) {
        this.selectedComponent = this.components.find(c => c.id === id);
        this.renderPropertiesPanel();
        
        // Update visual selection
        document.querySelectorAll('.email-component').forEach(el => {
            el.classList.remove('selected');
        });
        const selectedEl = document.querySelector(`[data-id="${id}"]`);
        if (selectedEl) {
            selectedEl.classList.add('selected');
            selectedEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    deleteComponent(id) {
        const component = this.components.find(c => c.id === id);
        if (!component) return;

        if (confirm('Are you sure you want to delete this component?')) {
            this.components = this.components.filter(c => c.id !== id);
            this.saveComponents();
            this.renderCanvas();
            this.selectedComponent = null;
            this.renderPropertiesPanel();
            
            this.showToast('Component deleted!', 'success');
        }
    }

    duplicateComponent(id) {
        const component = this.components.find(c => c.id === id);
        if (component) {
            const duplicated = JSON.parse(JSON.stringify(component));
            duplicated.id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
            const index = this.components.indexOf(component);
            this.components.splice(index + 1, 0, duplicated);
            this.saveComponents();
            this.renderCanvas();
            this.selectComponent(duplicated.id);
            
            this.showToast('Component duplicated!', 'success');
        }
    }

    duplicateSelected() {
        if (this.selectedComponent) {
            this.duplicateComponent(this.selectedComponent.id);
        } else {
            this.showToast('Please select a component first', 'error');
        }
    }

    moveComponent(index, direction) {
        if (direction === 'up' && index > 0) {
            [this.components[index], this.components[index - 1]] = 
            [this.components[index - 1], this.components[index]];
            this.saveComponents();
            this.renderCanvas();
            
            if (this.selectedComponent) {
                const newIndex = direction === 'up' ? index - 1 : index + 1;
                this.selectComponent(this.components[newIndex].id);
            }
        } else if (direction === 'down' && index < this.components.length - 1) {
            [this.components[index], this.components[index + 1]] = 
            [this.components[index + 1], this.components[index]];
            this.saveComponents();
            this.renderCanvas();
            
            if (this.selectedComponent) {
                const newIndex = direction === 'up' ? index - 1 : index + 1;
                this.selectComponent(this.components[newIndex].id);
            }
        }
    }

    renderPropertiesPanel() {
        const panel = document.getElementById('propertiesPanel');
        
        if (!this.selectedComponent) {
            panel.innerHTML = `
                <div class="empty-properties">
                    <i class="fas fa-cog"></i>
                    <p>Select a component to edit its properties</p>
                </div>
            `;
            return;
        }

        let propertiesHTML = '';
        const component = this.selectedComponent;

        switch(component.type) {
            case 'header':
                propertiesHTML = `
                    <div class="property-group">
                        <h4>Header Settings</h4>
                        <div class="form-group">
                            <label>Text Content</label>
                            <input type="text" class="prop-input" data-prop="text" value="${this.escapeHtml(component.settings.text)}">
                        </div>
                        <div class="form-group">
                            <label>Alignment</label>
                            <select class="prop-input" data-prop="alignment">
                                <option value="left" ${component.settings.alignment === 'left' ? 'selected' : ''}>Left</option>
                                <option value="center" ${component.settings.alignment === 'center' ? 'selected' : ''}>Center</option>
                                <option value="right" ${component.settings.alignment === 'right' ? 'selected' : ''}>Right</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Font Size</label>
                            <input type="text" class="prop-input" data-prop="fontSize" value="${component.settings.fontSize}">
                        </div>
                        <div class="form-group">
                            <label>Text Color</label>
                            <div class="color-input-group">
                                <input type="color" class="prop-color" data-prop="color" value="${component.settings.color}">
                                <input type="text" class="prop-input prop-color-text" data-prop="color" value="${component.settings.color}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Padding</label>
                            <input type="text" class="prop-input" data-prop="padding" value="${component.settings.padding}">
                        </div>
                    </div>
                `;
                break;
            case 'text':
                propertiesHTML = `
                    <div class="property-group">
                        <h4>Text Settings</h4>
                        <div class="form-group">
                            <label>Content (HTML allowed)</label>
                            <textarea class="prop-input" data-prop="content" rows="6">${this.escapeHtml(component.settings.content)}</textarea>
                        </div>
                        <div class="form-group">
                            <label>Alignment</label>
                            <select class="prop-input" data-prop="alignment">
                                <option value="left" ${component.settings.alignment === 'left' ? 'selected' : ''}>Left</option>
                                <option value="center" ${component.settings.alignment === 'center' ? 'selected' : ''}>Center</option>
                                <option value="right" ${component.settings.alignment === 'right' ? 'selected' : ''}>Right</option>
                                <option value="justify" ${component.settings.alignment === 'justify' ? 'selected' : ''}>Justify</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Font Size</label>
                            <input type="text" class="prop-input" data-prop="fontSize" value="${component.settings.fontSize}">
                        </div>
                        <div class="form-group">
                            <label>Text Color</label>
                            <div class="color-input-group">
                                <input type="color" class="prop-color" data-prop="color" value="${component.settings.color}">
                                <input type="text" class="prop-input prop-color-text" data-prop="color" value="${component.settings.color}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Line Height</label>
                            <input type="text" class="prop-input" data-prop="lineHeight" value="${component.settings.lineHeight || '1.6'}">
                        </div>
                        <div class="form-group">
                            <label>Padding</label>
                            <input type="text" class="prop-input" data-prop="padding" value="${component.settings.padding}">
                        </div>
                    </div>
                `;
                break;
            case 'image':
                propertiesHTML = `
                    <div class="property-group">
                        <h4>Image Settings</h4>
                        <div class="form-group">
                            <label>Image URL</label>
                            <input type="text" class="prop-input" data-prop="src" value="${component.settings.src}">
                        </div>
                        <div class="form-group">
                            <label>Alternative Text</label>
                            <input type="text" class="prop-input" data-prop="alt" value="${component.settings.alt}">
                        </div>
                        <div class="form-group">
                            <label>Width</label>
                            <input type="text" class="prop-input" data-prop="width" value="${component.settings.width}">
                        </div>
                        <div class="form-group">
                            <label>Alignment</label>
                            <select class="prop-input" data-prop="alignment">
                                <option value="left" ${component.settings.alignment === 'left' ? 'selected' : ''}>Left</option>
                                <option value="center" ${component.settings.alignment === 'center' ? 'selected' : ''}>Center</option>
                                <option value="right" ${component.settings.alignment === 'right' ? 'selected' : ''}>Right</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Link URL (optional)</label>
                            <input type="text" class="prop-input" data-prop="linkUrl" value="${component.settings.linkUrl || ''}">
                        </div>
                        <div class="form-group">
                            <label>Border Radius</label>
                            <input type="text" class="prop-input" data-prop="borderRadius" value="${component.settings.borderRadius}">
                        </div>
                    </div>
                `;
                break;
            case 'button':
                propertiesHTML = `
                    <div class="property-group">
                        <h4>Button Settings</h4>
                        <div class="form-group">
                            <label>Button Text</label>
                            <input type="text" class="prop-input" data-prop="text" value="${this.escapeHtml(component.settings.text)}">
                        </div>
                        <div class="form-group">
                            <label>Button URL</label>
                            <input type="text" class="prop-input" data-prop="url" value="${component.settings.url}">
                        </div>
                        <div class="form-group">
                            <label>Alignment</label>
                            <select class="prop-input" data-prop="alignment">
                                <option value="left" ${component.settings.alignment === 'left' ? 'selected' : ''}>Left</option>
                                <option value="center" ${component.settings.alignment === 'center' ? 'selected' : ''}>Center</option>
                                <option value="right" ${component.settings.alignment === 'right' ? 'selected' : ''}>Right</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Background Color</label>
                            <div class="color-input-group">
                                <input type="color" class="prop-color" data-prop="bgColor" value="${component.settings.bgColor}">
                                <input type="text" class="prop-input prop-color-text" data-prop="bgColor" value="${component.settings.bgColor}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Text Color</label>
                            <div class="color-input-group">
                                <input type="color" class="prop-color" data-prop="textColor" value="${component.settings.textColor}">
                                <input type="text" class="prop-input prop-color-text" data-prop="textColor" value="${component.settings.textColor}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Padding</label>
                            <input type="text" class="prop-input" data-prop="padding" value="${component.settings.padding}">
                        </div>
                        <div class="form-group">
                            <label>Border Radius</label>
                            <input type="text" class="prop-input" data-prop="borderRadius" value="${component.settings.borderRadius}">
                        </div>
                        <div class="form-group">
                            <label>Font Size</label>
                            <input type="text" class="prop-input" data-prop="fontSize" value="${component.settings.fontSize || '16px'}">
                        </div>
                    </div>
                `;
                break;
            case 'divider':
                propertiesHTML = `
                    <div class="property-group">
                        <h4>Divider Settings</h4>
                        <div class="form-group">
                            <label>Color</label>
                            <div class="color-input-group">
                                <input type="color" class="prop-color" data-prop="color" value="${component.settings.color}">
                                <input type="text" class="prop-input prop-color-text" data-prop="color" value="${component.settings.color}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Thickness</label>
                            <input type="text" class="prop-input" data-prop="thickness" value="${component.settings.thickness}">
                        </div>
                        <div class="form-group">
                            <label>Width</label>
                            <input type="text" class="prop-input" data-prop="width" value="${component.settings.width}">
                        </div>
                        <div class="form-group">
                            <label>Style</label>
                            <select class="prop-input" data-prop="style">
                                <option value="solid" ${component.settings.style === 'solid' ? 'selected' : ''}>Solid</option>
                                <option value="dashed" ${component.settings.style === 'dashed' ? 'selected' : ''}>Dashed</option>
                                <option value="dotted" ${component.settings.style === 'dotted' ? 'selected' : ''}>Dotted</option>
                                <option value="double" ${component.settings.style === 'double' ? 'selected' : ''}>Double</option>
                            </select>
                        </div>
                    </div>
                `;
                break;
            case 'footer':
                propertiesHTML = `
                    <div class="property-group">
                        <h4>Footer Settings</h4>
                        <div class="form-group">
                            <label>Copyright Text</label>
                            <input type="text" class="prop-input" data-prop="copyrightText" value="${this.escapeHtml(component.settings.copyrightText)}">
                        </div>
                        <div class="form-group">
                            <label>Alignment</label>
                            <select class="prop-input" data-prop="alignment">
                                <option value="left" ${component.settings.alignment === 'left' ? 'selected' : ''}>Left</option>
                                <option value="center" ${component.settings.alignment === 'center' ? 'selected' : ''}>Center</option>
                                <option value="right" ${component.settings.alignment === 'right' ? 'selected' : ''}>Right</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Font Size</label>
                            <input type="text" class="prop-input" data-prop="fontSize" value="${component.settings.fontSize}">
                        </div>
                        <div class="form-group">
                            <label>Text Color</label>
                            <div class="color-input-group">
                                <input type="color" class="prop-color" data-prop="color" value="${component.settings.color}">
                                <input type="text" class="prop-input prop-color-text" data-prop="color" value="${component.settings.color}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Links (comma separated)</label>
                            <input type="text" class="prop-input" data-prop="links" value="${component.settings.links}">
                        </div>
                        <div class="form-group">
                            <label>Link Color</label>
                            <div class="color-input-group">
                                <input type="color" class="prop-color" data-prop="linkColor" value="${component.settings.linkColor}">
                                <input type="text" class="prop-input prop-color-text" data-prop="linkColor" value="${component.settings.linkColor}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Border Top</label>
                            <input type="text" class="prop-input" data-prop="borderTop" value="${component.settings.borderTop}">
                        </div>
                        <div class="form-group">
                            <label>Padding</label>
                            <input type="text" class="prop-input" data-prop="padding" value="${component.settings.padding}">
                        </div>
                    </div>
                `;
                break;
            case 'table':
                propertiesHTML = `
                    <div class="property-group">
                        <h4>Table Settings</h4>
                        <div class="form-group">
                            <label>Headers (comma separated)</label>
                            <input type="text" class="prop-input" data-prop="header" value="${component.settings.header ? component.settings.header.join(', ') : ''}">
                        </div>
                        <div class="form-group">
                            <label>Rows (one per line, format: cell1, cell2, cell3)</label>
                            <textarea class="prop-input" data-prop="rows" rows="6">${component.settings.rows ? component.settings.rows.map(row => row.join(', ')).join('\n') : ''}</textarea>
                        </div>
                        <div class="form-group">
                            <label>Show Total Row</label>
                            <input type="checkbox" class="prop-checkbox" data-prop="showTotal" ${component.settings.showTotal ? 'checked' : ''}>
                        </div>
                        <div class="form-group">
                            <label>Total Label</label>
                            <input type="text" class="prop-input" data-prop="totalLabel" value="${component.settings.totalLabel || 'Total'}">
                        </div>
                        <div class="form-group">
                            <label>Total Amount</label>
                            <input type="text" class="prop-input" data-prop="totalAmount" value="${component.settings.totalAmount || ''}">
                        </div>
                        <div class="form-group">
                            <label>Border Color</label>
                            <div class="color-input-group">
                                <input type="color" class="prop-color" data-prop="borderColor" value="${component.settings.borderColor}">
                                <input type="text" class="prop-input prop-color-text" data-prop="borderColor" value="${component.settings.borderColor}">
                            </div>
                        </div>
                    </div>
                `;
                break;
        }

        propertiesHTML += `
            <button id="updateComponent" class="btn btn-primary" style="width: 100%; margin-top: 20px;">
                <i class="fas fa-check"></i> Update Component
            </button>
        `;

        panel.innerHTML = propertiesHTML;

        // Add event listeners
        document.getElementById('updateComponent').addEventListener('click', () => {
            this.updateComponentProperties();
        });

        // Setup color pickers
        this.setupPropertyColorPickers();

        // Setup checkbox
        const checkbox = panel.querySelector('.prop-checkbox');
        if (checkbox) {
            checkbox.addEventListener('change', () => {
                this.updateComponentProperties();
            });
        }
    }

    setupPropertyColorPickers() {
        document.querySelectorAll('.prop-color').forEach(colorInput => {
            const textInput = colorInput.nextElementSibling;
            
            colorInput.addEventListener('input', (e) => {
                textInput.value = e.target.value;
            });
            
            textInput.addEventListener('input', (e) => {
                const color = e.target.value;
                if (this.isValidColor(color)) {
                    colorInput.value = color;
                }
            });
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    updateComponentProperties() {
        if (!this.selectedComponent) return;

        const component = this.selectedComponent;
        const index = this.components.findIndex(c => c.id === component.id);

        // Get all property inputs
        const inputs = document.querySelectorAll('.prop-input');
        const checkboxes = document.querySelectorAll('.prop-checkbox');

        // Update settings
        inputs.forEach(input => {
            const prop = input.dataset.prop;
            if (prop) {
                if (prop === 'rows') {
                    // Parse rows from textarea
                    const rows = input.value.split('\n')
                        .filter(row => row.trim())
                        .map(row => row.split(',').map(cell => cell.trim()));
                    this.components[index].settings[prop] = rows;
                } else if (prop === 'header') {
                    // Parse header from comma-separated string
                    this.components[index].settings[prop] = input.value.split(',').map(h => h.trim());
                } else {
                    this.components[index].settings[prop] = input.value;
                }
            }
        });

        checkboxes.forEach(checkbox => {
            const prop = checkbox.dataset.prop;
            if (prop) {
                this.components[index].settings[prop] = checkbox.checked;
            }
        });

        this.saveComponents();
        this.renderCanvas();
        this.selectComponent(component.id); // Re-select to update properties panel
        
        this.showToast('Component updated!', 'success');
    }

    showPreview() {
        if (this.components.length === 0) {
            this.showToast('No content to preview. Add components first.', 'error');
            return;
        }

        const previewContent = document.getElementById('emailPreview');
        previewContent.innerHTML = this.generateHTML();
        
        document.getElementById('previewModal').style.display = 'flex';
        this.showToast('Preview generated!', 'success');
    }

    exportHTML() {
        if (this.components.length === 0) {
            this.showToast('No content to export. Add components first.', 'error');
            return;
        }

        const htmlCode = this.generateHTML(true);
        document.getElementById('htmlCode').value = htmlCode;
        document.getElementById('exportModal').style.display = 'flex';
    }

    exportJSON() {
        if (this.components.length === 0) {
            this.showToast('No content to export. Add components first.', 'error');
            return;
        }

        const templateData = {
            template: this.currentTemplate,
            components: this.components,
            styles: this.styles,
            metadata: {
                created: new Date().toISOString(),
                version: '1.0',
                generatedBy: 'EmailBuilder.js'
            }
        };
        
        document.getElementById('jsonCode').value = JSON.stringify(templateData, null, 2);
        document.getElementById('jsonModal').style.display = 'flex';
    }

    copyHTML() {
        if (this.components.length === 0) {
            this.showToast('No content to copy. Add components first.', 'error');
            return;
        }

        const htmlCode = this.generateHTML(true);
        this.copyToClipboardText(htmlCode, 'HTML copied to clipboard!');
    }

    copyToClipboard(elementId) {
        const textarea = document.getElementById(elementId);
        this.copyToClipboardText(textarea.value, 'Copied to clipboard!');
    }

    copyToClipboardText(text, message) {
        navigator.clipboard.writeText(text)
            .then(() => {
                this.showToast(message, 'success');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                // Fallback for older browsers
                const textarea = document.createElement('textarea');
                textarea.value = text;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                this.showToast(message, 'success');
            });
    }

    downloadHTML() {
        const htmlCode = document.getElementById('htmlCode').value;
        if (!htmlCode) return;

        const blob = new Blob([htmlCode], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `email-template-${Date.now()}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showToast('HTML downloaded!', 'success');
    }

    downloadJSON() {
        const jsonCode = document.getElementById('jsonCode').value;
        if (!jsonCode) return;

        const blob = new Blob([jsonCode], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `email-template-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showToast('JSON downloaded!', 'success');
    }

    saveTemplate() {
        if (this.components.length === 0) {
            this.showToast('No content to save. Add components first.', 'error');
            return;
        }

        const html = this.generateHTML(true);
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `email-template-${Date.now()}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showToast('Template saved successfully!', 'success');
    }

    generateHTML(includeWrapper = false) {
        let html = '';
        
        this.components.forEach(component => {
            let componentHTML = '';
            
            switch(component.type) {
                case 'header':
                    componentHTML = `
                        <h2 style="text-align: ${component.settings.alignment}; 
                                   color: ${component.settings.color}; 
                                   font-size: ${component.settings.fontSize}; 
                                   font-family: ${this.styles.fontFamily}; 
                                   padding: ${component.settings.padding}; 
                                   margin: 0;">
                            ${component.settings.text}
                        </h2>
                    `;
                    break;
                case 'text':
                    componentHTML = `
                        <div style="text-align: ${component.settings.alignment}; 
                                    color: ${component.settings.color}; 
                                    font-size: ${component.settings.fontSize}; 
                                    font-family: ${this.styles.fontFamily}; 
                                    line-height: ${component.settings.lineHeight}; 
                                    padding: ${component.settings.padding};">
                            ${component.settings.content}
                        </div>
                    `;
                    break;
                case 'image':
                    const imgTag = `
                        <img src="${component.settings.src}" 
                             alt="${component.settings.alt}" 
                             style="width: ${component.settings.width}; 
                                    max-width: 100%; 
                                    height: auto;
                                    border: ${component.settings.border};
                                    border-radius: ${component.settings.borderRadius};">
                    `;
                    
                    componentHTML = `
                        <div style="text-align: ${component.settings.alignment};">
                            ${component.settings.linkUrl ? 
                                `<a href="${component.settings.linkUrl}" target="_blank">${imgTag}</a>` : 
                                imgTag}
                        </div>
                    `;
                    break;
                case 'button':
                    componentHTML = `
                        <div style="text-align: ${component.settings.alignment};">
                            <a href="${component.settings.url}" 
                               style="background-color: ${component.settings.bgColor}; 
                                      color: ${component.settings.textColor}; 
                                      padding: ${component.settings.padding}; 
                                      text-decoration: none; 
                                      display: inline-block; 
                                      border-radius: ${component.settings.borderRadius}; 
                                      font-family: ${this.styles.fontFamily};
                                      font-size: ${component.settings.fontSize};
                                      font-weight: 600;">
                                ${component.settings.text}
                            </a>
                        </div>
                    `;
                    break;
                case 'divider':
                    componentHTML = `
                        <div style="width: ${component.settings.width}; 
                                    border-bottom: ${component.settings.thickness} ${component.settings.style} ${component.settings.color}; 
                                    margin: 20px auto;">
                        </div>
                    `;
                    break;
                case 'footer':
                    const links = component.settings.links.split(',').map(link => 
                        `<a href="#" style="color: ${component.settings.linkColor}; text-decoration: none; margin: 0 5px;">${link.trim()}</a>`
                    ).join(' | ');
                    
                    componentHTML = `
                        <div style="text-align: ${component.settings.alignment}; 
                                    color: ${component.settings.color}; 
                                    font-size: ${component.settings.fontSize}; 
                                    font-family: ${this.styles.fontFamily}; 
                                    padding: ${component.settings.padding}; 
                                    border-top: ${component.settings.borderTop};">
                            <p style="margin: 0 0 10px 0;">${component.settings.copyrightText}</p>
                            ${component.settings.links ? 
                                `<div style="font-size: 11px; margin-top: 10px;">${links}</div>` : 
                                ''}
                        </div>
                    `;
                    break;
                case 'table':
                    let tableHTML = `
                        <table style="width: 100%; border-collapse: collapse; font-family: ${this.styles.fontFamily}; margin: 20px 0;">
                    `;
                    
                    if (component.settings.header && component.settings.header.length > 0) {
                        tableHTML += '<thead><tr>';
                        component.settings.header.forEach(cell => {
                            tableHTML += `<th style="text-align: left; padding: 12px; border-bottom: 2px solid ${component.settings.borderColor}; 
                                           color: ${this.styles.textColor}; font-weight: 600;">${cell}</th>`;
                        });
                        tableHTML += '</tr></thead>';
                    }
                    
                    tableHTML += '<tbody>';
                    component.settings.rows.forEach((row, rowIndex) => {
                        tableHTML += '<tr>';
                        row.forEach(cell => {
                            tableHTML += `<td style="padding: 12px; border-bottom: ${rowIndex === component.settings.rows.length - 1 && !component.settings.showTotal ? 'none' : `1px solid ${component.settings.borderColor}`}; 
                                           color: ${this.styles.textColor};">${cell}</td>`;
                        });
                        tableHTML += '</tr>';
                    });
                    tableHTML += '</tbody>';
                    
                    if (component.settings.showTotal) {
                        const colspan = component.settings.header ? component.settings.header.length - 1 : 1;
                        tableHTML += `
                            <tfoot>
                                <tr>
                                    <td style="padding: 12px; font-weight: 600; color: ${this.styles.textColor};" colspan="${colspan}">
                                        ${component.settings.totalLabel}
                                    </td>
                                    <td style="padding: 12px; font-weight: 600; color: ${this.styles.textColor};">
                                        ${component.settings.totalAmount}
                                    </td>
                                </tr>
                            </tfoot>
                        `;
                    }
                    
                    tableHTML += '</table>';
                    componentHTML = tableHTML;
                    break;
            }
            
            html += componentHTML;
        });

        if (includeWrapper) {
            html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <style>
        body {
            font-family: ${this.styles.fontFamily};
            line-height: 1.6;
            color: ${this.styles.textColor};
            background-color: ${this.styles.bgColor};
            margin: 0;
            padding: 20px;
        }
        .email-container {
            max-width: ${this.styles.contentWidth};
            margin: 0 auto;
            background-color: ${this.styles.canvasColor};
            border-radius: ${this.styles.borderRadius};
            padding: 40px;
        }
        @media only screen and (max-width: 600px) {
            body {
                padding: 10px;
            }
            .email-container {
                padding: 20px;
                border-radius: 8px;
            }
            h2 {
                font-size: 20px !important;
            }
            a.button {
                padding: 10px 20px !important;
                font-size: 14px !important;
            }
            table {
                font-size: 12px !important;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        ${html}
    </div>
</body>
</html>`;
        }

        return html;
    }

    clearCanvas() {
        if (this.components.length === 0) {
            this.showToast('Canvas is already empty', 'info');
            return;
        }

        if (confirm('Are you sure you want to clear the canvas? This action cannot be undone.')) {
            this.components = [];
            this.currentTemplate = null;
            this.saveComponents();
            this.renderCanvas();
            this.selectedComponent = null;
            this.renderPropertiesPanel();
            
            // Clear active template
            document.querySelectorAll('.template-item').forEach(item => {
                item.classList.remove('active');
            });
            
            this.showToast('Canvas cleared!', 'success');
        }
    }

    undo() {
        if (this.history.length === 0) {
            this.showToast('Nothing to undo', 'info');
            return;
        }

        this.future.push({
            components: JSON.parse(JSON.stringify(this.components)),
            template: this.currentTemplate,
            timestamp: Date.now()
        });
        
        const previous = this.history.pop();
        this.components = previous.components;
        this.currentTemplate = previous.template;
        
        this.renderCanvas();
        this.selectedComponent = null;
        this.renderPropertiesPanel();
        
        // Update active template
        document.querySelectorAll('.template-item').forEach(item => {
            item.classList.remove('active');
        });
        if (this.currentTemplate) {
            const templateEl = document.querySelector(`[data-template="${this.currentTemplate}"]`);
            if (templateEl) {
                templateEl.classList.add('active');
            }
        }
        
        this.showToast('Undo successful', 'success');
    }

    redo() {
        if (this.future.length === 0) {
            this.showToast('Nothing to redo', 'info');
            return;
        }

        this.history.push({
            components: JSON.parse(JSON.stringify(this.components)),
            template: this.currentTemplate,
            timestamp: Date.now()
        });
        
        const next = this.future.pop();
        this.components = next.components;
        this.currentTemplate = next.template;
        
        this.renderCanvas();
        this.selectedComponent = null;
        this.renderPropertiesPanel();
        
        // Update active template
        document.querySelectorAll('.template-item').forEach(item => {
            item.classList.remove('active');
        });
        if (this.currentTemplate) {
            const templateEl = document.querySelector(`[data-template="${this.currentTemplate}"]`);
            if (templateEl) {
                templateEl.classList.add('active');
            }
        }
        
        this.showToast('Redo successful', 'success');
    }

    showToast(message, type = 'info') {
        // Remove existing toasts
        document.querySelectorAll('.toast').forEach(toast => {
            toast.remove();
        });

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(toast);

        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.emailBuilder = new EmailBuilder();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Don't trigger shortcuts when typing in inputs
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
            return;
        }

        // Ctrl+Z for undo
        if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
            e.preventDefault();
            window.emailBuilder.undo();
        }
        
        // Ctrl+Y or Ctrl+Shift+Z for redo
        if ((e.ctrlKey && e.key === 'y') || (e.ctrlKey && e.shiftKey && e.key === 'Z')) {
            e.preventDefault();
            window.emailBuilder.redo();
        }
        
        // Delete key to delete selected component
        if (e.key === 'Delete' && window.emailBuilder.selectedComponent) {
            e.preventDefault();
            window.emailBuilder.deleteComponent(window.emailBuilder.selectedComponent.id);
        }
        
        // Escape to deselect component
        if (e.key === 'Escape') {
            window.emailBuilder.selectedComponent = null;
            window.emailBuilder.renderPropertiesPanel();
            document.querySelectorAll('.email-component').forEach(el => {
                el.classList.remove('selected');
            });
        }
        
        // Ctrl+D to duplicate
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            window.emailBuilder.duplicateSelected();
        }
        
        // Ctrl+S to save
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            window.emailBuilder.saveTemplate();
        }
        
        // Ctrl+P to preview
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            window.emailBuilder.showPreview();
        }
        
        // Ctrl+E to export HTML
        if (e.ctrlKey && e.key === 'e') {
            e.preventDefault();
            window.emailBuilder.exportHTML();
        }
    });

    // Prevent default drag behavior
    document.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    document.addEventListener('drop', (e) => {
        e.preventDefault();
    });
});