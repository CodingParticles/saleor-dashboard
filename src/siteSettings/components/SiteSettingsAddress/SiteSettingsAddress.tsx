import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { useIntl, IntlShape } from "react-intl";

import CardTitle from "@saleor/components/CardTitle";
import FormSpacer from "@saleor/components/FormSpacer";
import Grid from "@saleor/components/Grid";
import SingleAutocompleteSelectField, {
  SingleAutocompleteChoiceType
} from "@saleor/components/SingleAutocompleteSelectField";
import { ChangeEvent } from "@saleor/hooks/useForm";
import { getFormErrors } from "@saleor/utils/errors";
import { ShopErrorFragment } from "@saleor/siteSettings/types/ShopErrorFragment";
import getShopErrorMessage from "@saleor/utils/errors/shop";
import { AccountErrorFragment } from "@saleor/customers/types/AccountErrorFragment";
import getAccountErrorMessage from "@saleor/utils/errors/account";
import { SiteSettingsPageFormData } from "../SiteSettingsPage";

interface SiteSettingsAddressProps {
  countries: SingleAutocompleteChoiceType[];
  data: SiteSettingsPageFormData;
  displayCountry: string;
  errors: Array<AccountErrorFragment | ShopErrorFragment>;
  disabled: boolean;
  onChange: (event: ChangeEvent) => void;
  onCountryChange: (event: ChangeEvent) => void;
}

const useStyles = makeStyles(
  {
    root: {
      overflow: "visible"
    }
  },
  { name: "SiteSettingsAddress" }
);

function getErrorMessage(
  err: AccountErrorFragment | ShopErrorFragment,
  intl: IntlShape
): string {
  if (err?.__typename === "AccountError") {
    return getAccountErrorMessage(err, intl);
  }

  return getShopErrorMessage(err, intl);
}

const SiteSettingsAddress: React.FC<SiteSettingsAddressProps> = props => {
  const {
    countries,
    data,
    disabled,
    displayCountry,
    errors,
    onChange,
    onCountryChange
  } = props;

  const classes = useStyles(props);
  const intl = useIntl();

  const formFields = [
    "companyName",
    "streetAddress1",
    "streetAddress2",
    "city",
    "postalCode",
    "country",
    "companyArea",
    "phone"
  ];
  const formErrors = getFormErrors(formFields, errors);

  return (
    <Card className={classes.root}>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Store Information",
          description: "section header"
        })}
      />
      <CardContent>
        <TextField
          disabled={disabled}
          error={!!formErrors.companyName}
          helperText={getErrorMessage(formErrors.companyName, intl)}
          label={intl.formatMessage({
            defaultMessage: "Company"
          })}
          name={"companyName" as keyof SiteSettingsPageFormData}
          onChange={onChange}
          value={data.companyName}
          fullWidth
        />
        <FormSpacer />
        <TextField
          disabled={disabled}
          error={!!formErrors.streetAddress1}
          helperText={getErrorMessage(formErrors.streetAddress1, intl)}
          label={intl.formatMessage({
            defaultMessage: "Address line 1"
          })}
          name={"streetAddress1" as keyof SiteSettingsPageFormData}
          onChange={onChange}
          value={data.streetAddress1}
          fullWidth
        />
        <FormSpacer />
        <TextField
          disabled={disabled}
          error={!!formErrors.streetAddress2}
          helperText={getErrorMessage(formErrors.streetAddress2, intl)}
          label={intl.formatMessage({
            defaultMessage: "Address line 2"
          })}
          name={"streetAddress2" as keyof SiteSettingsPageFormData}
          onChange={onChange}
          value={data.streetAddress2}
          fullWidth
        />
        <FormSpacer />
        <Grid>
          <TextField
            disabled={disabled}
            error={!!formErrors.city}
            helperText={getErrorMessage(formErrors.city, intl)}
            label={intl.formatMessage({
              defaultMessage: "City"
            })}
            name={"city" as keyof SiteSettingsPageFormData}
            onChange={onChange}
            value={data.city}
            fullWidth
          />
          <TextField
            disabled={disabled}
            error={!!formErrors.postalCode}
            helperText={getErrorMessage(formErrors.postalCode, intl)}
            label={intl.formatMessage({
              defaultMessage: "ZIP / Postal code"
            })}
            name={"postalCode" as keyof SiteSettingsPageFormData}
            onChange={onChange}
            value={data.postalCode}
            fullWidth
          />
        </Grid>
        <FormSpacer />
        <Grid>
          <SingleAutocompleteSelectField
            disabled={disabled}
            displayValue={displayCountry}
            error={!!formErrors.country}
            helperText={getErrorMessage(formErrors.country, intl)}
            label={intl.formatMessage({
              defaultMessage: "Country"
            })}
            name={"country" as keyof SiteSettingsPageFormData}
            onChange={onCountryChange}
            value={data.country}
            choices={countries}
            InputProps={{
              autoComplete: "off"
            }}
          />
          <TextField
            disabled={disabled}
            error={!!formErrors.countryArea}
            helperText={getErrorMessage(formErrors.countryArea, intl)}
            label={intl.formatMessage({
              defaultMessage: "Country area"
            })}
            name={"countryArea" as keyof SiteSettingsPageFormData}
            onChange={onChange}
            value={data.countryArea}
            fullWidth
          />
        </Grid>
        <FormSpacer />
        <TextField
          disabled={disabled}
          error={!!formErrors.phone}
          fullWidth
          helperText={getErrorMessage(formErrors.phone, intl)}
          label={intl.formatMessage({
            defaultMessage: "Phone"
          })}
          name={"phone" as keyof SiteSettingsPageFormData}
          value={data.phone}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};
SiteSettingsAddress.displayName = "SiteSettingsAddress";
export default SiteSettingsAddress;
