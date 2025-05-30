// "use client";

// import { useEffect, Suspense } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useAuth } from "@/contexts/AuthContext";
// import { Icons } from "@/components/icons";
// import LoadingSpinner from "@/components/ui/loading-spinner";

// export default function AuthLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { user, loading } = useAuth();
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     // Only redirect if not loading and user is logged in
//     if (!loading && user) {
//       // Redirect to 'from' query parameter or '/profile'
//       const from = searchParams.get("from") || "/profile";
//       router.replace(decodeURIComponent(from));
//     }
//   }, [user, loading, router, searchParams]);

//   // Commenting this because already spinner present on the login & signup button so in the auth layout we don't need to show the spinner again
//   // if (loading) {
//   //   return <LoadingSpinner />;
//   // }

//   // Render children only if user is not logged in
//   if (!user) {
//     return (
//       <div className="relative flex min-h-screen flex-col">
//         <div className="flex-1">{children}</div>
//       </div>
//     );
//   }

//   // Return null if redirecting (handled by useEffect)
//   return null;
// }

"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

// Client Component for redirect logic
function AuthRedirect() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!loading && user) {
      const from = searchParams.get("from") || "/profile";
      router.replace(decodeURIComponent(from));
    }
  }, [user, loading, router, searchParams]);

  return null;
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  // Commenting this because already spinner present on the login & signup button
  // if (loading) {
  //   return <LoadingSpinner />;
  // }

  if (!user) {
    return (
      <div className="relative flex min-h-screen flex-col">
        <div className="flex-1">{children}</div>
      </div>
    );
  }

  // Wrap client-side redirect logic in Suspense
  return (
    <Suspense fallback={null}>
      <AuthRedirect />
    </Suspense>
  );
}
