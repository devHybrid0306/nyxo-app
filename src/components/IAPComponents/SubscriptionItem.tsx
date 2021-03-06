import React from 'react'
import { PurchasesPackage } from 'react-native-purchases'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import { purchaseSubscription } from '@actions/subscription/subscription-actions'
import colors from '../../styles/colors'
import { fonts, StyleProps } from '../../styles/themes'
import TranslatedText from '../TranslatedText'

const SubscriptionItem = ({
  subscription
}: {
  subscription: PurchasesPackage
}) => {
  const dispatch = useDispatch()

  const {
    packageType,
    product: { price, title, price_string }
  } = subscription

  const purchaseItem = async () => {
    dispatch(purchaseSubscription(subscription))
  }

  const perMonthPrice =
    Math.ceil((price / monthlyPrice[packageType]) * 100) / 100

  return (
    <Button onPress={purchaseItem}>
      <SubscriptionOption>
        <TimeContainer>
          <Time>{title}</Time>
          <Months>{`IAP.${packageType}`}</Months>
        </TimeContainer>
        <PriceContainer>
          <Price>{price_string}</Price>
          <Offer variables={{ perMonth: perMonthPrice }}>PER_MONTH</Offer>
        </PriceContainer>
      </SubscriptionOption>
    </Button>
  )
}

export default SubscriptionItem

const monthlyPrice = {
  MONTHLY: 1,
  THREE_MONTH: 3,
  ANNUAL: 12,
  UNKNOWN: 1,
  CUSTOM: 1,
  LIFETIME: 1,
  SIX_MONTH: 6,
  WEEKLY: 0.25,
  TWO_MONTH: 2
}

const TimeContainer = styled.View`
  background-color: ${(props: StyleProps) =>
    props.theme.mode === 'light' ? colors.afternoon : colors.afternoonAccent};
  flex: 1;
  height: 100%;
  width: 100%;
  justify-content: center;

  padding: 20px 10px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`

const Time = styled.Text`
  font-family: ${fonts.medium};
  font-size: 18px;
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
`

const Months = styled(TranslatedText)`
  font-family: ${fonts.medium};
  text-transform: uppercase;
  margin-top: 5px;
  font-size: 13px;
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
`

const Button = styled.TouchableOpacity`
  flex-direction: row;
  flex: 1;
`

const SubscriptionOption = styled.View`
  align-items: center;
  flex: 1;
  flex-direction: row;
  background-color: ${(props: StyleProps) =>
    props.theme.SECONDARY_BACKGROUND_COLOR};
  border-radius: 5px;
  margin: 10px 5px;
  min-height: 100px;
  elevation: 3;
  box-shadow: ${(props: StyleProps) => props.theme.SHADOW};
`

const PriceContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding: 20px 10px;
`
const Price = styled.Text`
  font-size: 15px;
  font-family: ${fonts.bold};
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
`

const Offer = styled(TranslatedText)`
  font-size: 12px;
  margin-top: 5px;
  color: ${(props: StyleProps) => props.theme.SECONDARY_TEXT_COLOR};
  font-family: ${fonts.medium};
`
