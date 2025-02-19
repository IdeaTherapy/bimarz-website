"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FC, useState } from "react";
import Image from "next/image";

interface DonationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  projectTitle: string;
  projectImage: string;
  description: string;
}
interface PaymentFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

const DonationDialog: FC<DonationDialogProps> = ({
  isOpen,
  onOpenChange,
  projectTitle,
  projectImage,
  description,
}) => {
  const STEP_AMOUNT = 20000;
  const MIN_AMOUNT = 20000;
  const MAX_AMOUNT = 100000000;
  const [formData, setFormData] = useState<PaymentFormData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [formErrors, setFormErrors] = useState<{
    phoneNumber?: string;
  }>({});

  const [amount, setAmount] = useState(MIN_AMOUNT);

  const incrementAmount = () => {
    setAmount((prev) => Math.min(MAX_AMOUNT, prev + STEP_AMOUNT));
  };

  const decrementAmount = () => {
    setAmount((prev) => Math.max(MIN_AMOUNT, prev - STEP_AMOUNT));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = Number(e.target.value);
    if (newAmount < MIN_AMOUNT) {
      setAmount(MIN_AMOUNT);
    } else if (newAmount > MAX_AMOUNT) {
      setAmount(MAX_AMOUNT);
    } else {
      setAmount(newAmount);
    }
  };

  const validatePhoneNumber = (phone: string): boolean => {
    // Iranian mobile number format: 09XX XXX XXXX
    const phoneRegex = /^09[0-9]{9}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ""));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = e.target.value.replace(/[^\d\s]/g, "");

    setFormErrors((prev) => ({
      ...prev,
      phoneNumber: validatePhoneNumber(sanitizedValue)
        ? undefined
        : "لطفا یک شماره موبایل معتبر وارد کنید",
    }));

    setFormData((prev) => ({
      ...prev,
      phoneNumber: sanitizedValue,
    }));
  };

  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.phoneNumber &&
    validatePhoneNumber(formData.phoneNumber) &&
    !formErrors.phoneNumber;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] lg:max-w-[1000px] p-0 gap-0 overflow-y-auto max-h-[90vh] bg-[var(--background)]">
        <div className="flex flex-col-reverse lg:flex-row-reverse h-full">
          {/* Right side - Form */}
          <div className="flex-1 p-6 lg:p-8 text-right" dir="rtl">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold">
                {projectTitle}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm mb-2">
                  نام
                </label>
                <Input
                  id="name"
                  className="text-right bg-white border-[var(--border)]"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>

              <div>
                <label htmlFor="family" className="block text-sm mb-2">
                  نام خانوادگی
                </label>
                <Input
                  id="family"
                  className="text-right bg-white border-[var(--border)]"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm mb-2">
                  شماره تماس
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handlePhoneChange}
                  className={`text-right bg-white border-[var(--border)] ${
                    formErrors.phoneNumber ? "border-red-500" : ""
                  }`}
                  placeholder="09XX XXX XXXX"
                  dir="ltr"
                />
                {formErrors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1 text-right">
                    {formErrors.phoneNumber}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1 flex items-center">
                  <button
                    onClick={incrementAmount}
                    className="w-12 h-12 rounded-full bg-[var(--secondary-400)] text-white text-2xl flex items-center justify-center hover:bg-[var(--secondary-600)] transition-colors"
                    disabled={amount >= MAX_AMOUNT}
                  >
                    +
                  </button>
                  <Input
                    value={amount}
                    onChange={handleAmountChange}
                    type="number"
                    min={MIN_AMOUNT}
                    max={MAX_AMOUNT}
                    step={STEP_AMOUNT}
                    className="text-center border-none text-lg mx-auto bg-white w-2/3"
                  />
                  <button
                    onClick={decrementAmount}
                    className="w-12 h-12 rounded-full bg-[var(--secondary-400)] text-white text-2xl flex items-center justify-center hover:bg-[var(--secondary-600)] transition-colors"
                    disabled={amount <= MIN_AMOUNT}
                  >
                    -
                  </button>
                </div>
                <span className="text-sm">تومان</span>
              </div>

              <button
                disabled={!isFormValid}
                className={`w-full bg-[var(--secondary-400)] text-white py-3 rounded-xl hover:bg-[var(--secondary-600)] transition-colors text-lg font-bold ${
                  isFormValid
                    ? "hover:bg-[var(--secondary-600)]"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                پرداخت
              </button>

              <p className="text-sm text-gray-500 text-center">
                لطفا در هنگام وارد کردن مبلغ اهدایی، کیبورد خود را به حالت
                انگلیسی قرار دهید.
              </p>
            </div>
          </div>

          {/* Left side - Project Info */}
          <div className="flex-1 bg-gray-50 p-6 lg:p-8">
            <div className="relative w-full aspect-video mb-4">
              <Image
                src={projectImage}
                alt={projectTitle}
                fill
                className="object-cover rounded-lg mt-3"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <p className="text-right leading-7 text-gray-700" dir="rtl">
              {description}
            </p>
          </div>

          {/* Custom Close Button */}
          <DialogClose className="absolute rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            {/* <X className="h-4 w-4" /> */}
            {/* <span className="sr-only">Close</span> */}
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonationDialog;
