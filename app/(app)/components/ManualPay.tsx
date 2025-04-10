"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPersianNumber } from "../utils/numbers";
import { initiatePayment } from "../utils/utils";
interface ProjectInfo {
  name: string;
  amount: number;
  formatText: (count: number) => string;
}

interface PaymentFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

const ManualPay = () => {
  const [amount, setAmount] = useState("5,000,000");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<PaymentFormData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const [formErrors, setFormErrors] = useState<{
    phoneNumber?: string;
  }>({});

  const projectAmounts: Record<string, ProjectInfo> = useMemo(
    () => ({
      library: {
        name: "تجهیز کتابخانه‌های مدارس",
        amount: 64000000,
        formatText: (count: number) =>
          `${formatPersianNumber(count)} کتابخانه رو تجهیز کنیم.`,
      },
      subscription: {
        name: "آبونمان کتاب",
        amount: 30000000,
        formatText: (count: number) =>
          `برای ${formatPersianNumber(
            count * 10
          )} کودک و نوجوان، یکسال کتاب بفرستیم.`,
      },
      facilitator: {
        name: "آموزش تسهیلگر کتابخوانی",
        amount: 40000000,
        formatText: (count: number) =>
          `${formatPersianNumber(count)} تسهیلگر کتابخوانی رو آموزش بدیم.`,
      },
    }),
    []
  );

  const handleIncrement = () => {
    const currentAmount = parseInt(amount.replace(/,/g, ""));
    setAmount(new Intl.NumberFormat().format(currentAmount + 5000000));
  };

  const handleDecrement = () => {
    const currentAmount = parseInt(amount.replace(/,/g, ""));
    if (currentAmount > 10000) {
      setAmount(new Intl.NumberFormat().format(currentAmount - 5000000));
    }
  };

  const validatePhoneNumber = (phone: string): boolean => {
    // Iranian mobile number format: 09XX XXX XXXX
    const phoneRegex = /^09[0-9]{9}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ""));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      // Only allow numbers and spaces
      const sanitizedValue = value.replace(/[^\d\s]/g, "");

      setFormErrors((prev) => ({
        ...prev,
        phoneNumber: validatePhoneNumber(sanitizedValue)
          ? undefined
          : "لطفا یک شماره موبایل معتبر وارد کنید",
      }));

      setFormData((prev) => ({
        ...prev,
        [name]: sanitizedValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handlePaymentSubmit = async () => {
    try {
      const paymentUrl = await initiatePayment({
        amount: parseInt(amount.replace(/,/g, "")),
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
      });
      if (paymentUrl) {
        window.open(paymentUrl, "_blank");
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  const calculateEquivalents = useMemo(() => {
    const currentAmount = parseInt(amount.replace(/,/g, ""));
    const results: string[] = [];

    Object.values(projectAmounts).forEach(
      ({ amount: projectAmount, formatText }) => {
        const count = Math.floor(currentAmount / projectAmount);
        if (count >= 1) {
          results.push(formatText(count));
        }
      }
    );

    return results;
  }, [amount, projectAmounts]);

  const isFormValid = useMemo(() => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.phoneNumber &&
      validatePhoneNumber(formData.phoneNumber) &&
      !formErrors.phoneNumber
    );
  }, [formData, formErrors]);

  const styles = `
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(1rem);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideOut {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(-1rem);
      }
    }

    .animate-slideIn {
      animation: slideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      position: relative;
    }

    .animate-slideOut {
      animation: slideOut 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      position: absolute;
      width: 100%;
    }

    .item-container {
      position: relative;
      min-height: 2.5rem;
    }

    .items-wrapper {
      position: relative;
      min-height: 8rem;
      padding-top: 3.5rem;
    }

    .title-fixed {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;

      padding-bottom: 1.5rem;
      z-index: 10;
    }

    .content-area {
      position: relative;
      min-height: 12rem;
      display: flex;
      flex-direction: column;
    }

    .empty-state {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 12rem;
      width: 100%;
    }
  `;

  // Add this new state to track items that should be removed
  const [prevEquivalents, setPrevEquivalents] = useState<string[]>([]);
  const [animatingItems, setAnimatingItems] = useState<string[]>([]);
  const [visibleItems, setVisibleItems] = useState<string[]>([]);

  // Update useEffect to handle animations
  useEffect(() => {
    const newEquivalents = calculateEquivalents;

    // Items to be removed
    const itemsToRemove = prevEquivalents.filter(
      (item) => !newEquivalents.includes(item)
    );

    // Items to be added
    const itemsToAdd = newEquivalents.filter(
      (item) => !prevEquivalents.includes(item)
    );

    if (itemsToRemove.length > 0) {
      setAnimatingItems(itemsToRemove);
      const timer = setTimeout(() => {
        setVisibleItems(newEquivalents);
        setAnimatingItems([]);
      }, 300); // Match this with animation duration
      return () => clearTimeout(timer);
    } else if (itemsToAdd.length > 0) {
      setVisibleItems(newEquivalents);
    }

    setPrevEquivalents(newEquivalents);
  }, [calculateEquivalents, projectAmounts, prevEquivalents]);

  return (
    <>
      <style jsx global>
        {styles}
      </style>
      <section className="py-16 px-4 bg-white" dir="rtl">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-10 mt-[-20]">
            حمایت بی‌مرز
          </h2>
          <div className="bg-white rounded-xl shadow-md overflow-hidden w-full transition-all duration-300 ease-in-out hover:shadow-lg">
            <div className="flex flex-col lg:flex-row">
              {/* Left side - Form */}
              <div className="p-8 lg:w-1/2 flex flex-col justify-center">
                <h3 className="text-xl font-bold mb-8 text-center">
                  لطفا مبلغ حمایت خود را معین کنید
                </h3>

                <div className="flex items-center justify-center gap-4 mb-8">
                  <button
                    onClick={handleDecrement}
                    className="w-12 h-12 rounded-full bg-[var(--secondary-400)] text-white text-2xl flex items-center justify-center hover:bg-[var(--secondary-600)] transition-colors"
                  >
                    -
                  </button>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-48 h-12 text-center text-lg border rounded-lg"
                    />
                    <span className="absolute left-3 text-gray-600">تومان</span>
                  </div>
                  <button
                    onClick={handleIncrement}
                    className="w-12 h-12 rounded-full bg-[var(--secondary-400)] text-white text-2xl flex items-center justify-center hover:bg-[var(--secondary-600)] transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => setIsDialogOpen(true)}
                  className="w-full bg-[var(--secondary-400)] text-white py-3 rounded-xl hover:bg-[var(--secondary-600)] transition-colors text-lg font-bold mb-4"
                >
                  پرداخت
                </button>

                <p className="text-gray-500 text-sm text-center">
                  لطفا در هنگام وارد کردن مبلغ اهدایی کیبورد خود را به حالت
                  انگلیسی قرار دهید
                </p>
              </div>

              {/* Right side - Equivalent Projects */}
              <div className="p-8 lg:w-1/2 flex flex-col justify-center bg-[var(--primary-200)]">
                <div className="text-xl leading-relaxed content-area">
                  {calculateEquivalents.length > 0 ? (
                    <>
                      <div className="title-fixed">
                        <p className="text-right mb-2">
                          با این مبلغ ما می‌تونیم:
                        </p>
                      </div>
                      <div className="items-wrapper">
                        <div className="flex flex-col gap-6 pr-8">
                          {(visibleItems.length
                            ? visibleItems
                            : calculateEquivalents
                          ).map((text, index) => (
                            <div className="item-container" key={text}>
                              <div
                                className={`font-bold text-[var(--heading)] text-right transform ${
                                  animatingItems.includes(text)
                                    ? "animate-slideOut"
                                    : "animate-slideIn"
                                }`}
                                style={{
                                  animationDelay: `${index * 100}ms`,
                                  animationFillMode: "forwards",
                                }}
                              >
                                {index === 0 ? text : `یا ${text}`}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="empty-state">
                      <div className="text-[var(--heading)] text-center">
                        با حمایت بی‌مرز می‌توانید مبلغ دلخواهتان را در اختیار
                        پویش‌های با اولویت بیشتر قرار دهید.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent
            className="sm:max-w-md bg-[var(--background)]"
            dir="rtl"
          >
            <DialogHeader className="pr-5">
              <DialogTitle>اطلاعات پرداخت</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">نام</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="border-[var(--border)]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">نام خانوادگی</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="border-[var(--border)]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">شماره تماس</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  required
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  dir="ltr"
                  className={`border-[var(--border)] ${
                    formErrors.phoneNumber ? "border-red-500" : ""
                  }`}
                  placeholder="09XX XXX XXXX"
                />
                {formErrors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.phoneNumber}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter className="sm:justify-start mt-3">
              <button
                onClick={handlePaymentSubmit}
                disabled={!isFormValid}
                className={`w-full bg-[var(--secondary-400)] text-white py-3 rounded-xl transition-colors text-lg font-bold ${
                  isFormValid
                    ? "hover:bg-[var(--secondary-600)]"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                پرداخت {amount} تومان
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
    </>
  );
};

export default ManualPay;
