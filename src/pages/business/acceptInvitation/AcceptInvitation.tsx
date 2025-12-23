import { useEffect } from 'react'

import { useNavigate, useSearchParams } from 'react-router-dom'

import { useAcceptInvitationMutation } from '@/redux/business/userProfiles/userProfilesAPISlice'

import { t } from 'i18next'

import createToast from '@/lib/createToast'

const AcceptInvitation = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const code = searchParams.get('code')
    const businessId = searchParams.get('businessId')
    // const roleId = searchParams.get('businessId')

    const [acceptInviteMutation, { isSuccess, isError }] = useAcceptInvitationMutation()

    useEffect(() => {
        if (!code || !businessId) return

        acceptInviteMutation({ code, businessId })
    }, [code, businessId, acceptInviteMutation])

    useEffect(() => {
        if (!isSuccess) return

        createToast.success(t("invitation.message.success"))

        navigate('/', { replace: true })
    }, [isSuccess, navigate])

    useEffect(() => {
        if (isError) {
            createToast.error(t("invitation.message.error"))
        }
    }, [isError, navigate])

    return (
        <div className="p-5">
            {t("invitation.message.process")}
        </div>
    )
}

export default AcceptInvitation