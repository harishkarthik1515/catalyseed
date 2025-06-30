import React, { useState } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import RoleSelection from './RoleSelection';
import InstituteRegistration from './forms/InstituteRegistration';
import IncubationManagerRegistration from './forms/IncubationManagerRegistration';
import AcceleratorRegistration from './forms/AcceleratorRegistration';
import InvestorRegistration from './forms/InvestorRegistration';
import MentorRegistration from './forms/MentorRegistration';
import FounderRegistration from './forms/FounderRegistration';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [step, setStep] = useState<'role' | 'form'>('role');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [error, setError] = useState('');
  const { signup, loading } = useAuth();

  const handleRoleSelect = (role: string) => {
    // Don't allow admin signup
    if (role === 'admin') {
      setError('Admin accounts can only be created by existing administrators. Please contact support.');
      return;
    }
    setSelectedRole(role);
    setStep('form');
    setError('');
  };

  const handleFormSubmit = async (formData: any) => {
    setError('');
    
    try {
      await signup({
        ...formData,
        role: selectedRole as any
      });
      onClose();
    } catch (err) {
      setError('Failed to create account. Please try again.');
    }
  };

  const resetModal = () => {
    setStep('role');
    setSelectedRole('');
    setError('');
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const renderRegistrationForm = () => {
    const commonProps = {
      onSubmit: handleFormSubmit,
      loading,
      error,
      onSwitchToLogin
    };

    switch (selectedRole) {
      case 'institute':
        return <InstituteRegistration {...commonProps} />;
      case 'incubation_manager':
        return <IncubationManagerRegistration {...commonProps} />;
      case 'accelerator':
        return <AcceleratorRegistration {...commonProps} />;
      case 'investor':
        return <InvestorRegistration {...commonProps} />;
      case 'mentor':
        return <MentorRegistration {...commonProps} />;
      case 'founder':
        return <FounderRegistration {...commonProps} />;
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            {step === 'form' && (
              <button
                onClick={() => setStep('role')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-500" />
              </button>
            )}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Join Catalyseed</h2>
              <p className="text-gray-600 text-sm">
                {step === 'role' ? 'Choose your role to get started' : 'Complete your registration'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {step === 'role' ? (
            <RoleSelection onRoleSelect={handleRoleSelect} />
          ) : (
            renderRegistrationForm()
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupModal;