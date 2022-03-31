import {
  Checkbox,
  Column,
  GridColumns,
  Input,
  Select,
  Text,
  TextArea,
} from "@artsy/palette"
import { useUserFormContext } from "pages/users/useUserFormContext"

export const UserInfoForm: React.FC = () => {
  const { handleChange, handleBlur, errors, values, touched, setFieldValue } =
    useUserFormContext()

  return (
    <>
      <Text variant="lg" mb={4}>
        User Info
      </Text>

      <GridColumns>
        <Column span={12}>
          <Input
            name="name"
            title="Name"
            placeholder="Enter name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && errors.name}
            autoFocus
          />
        </Column>
        <Column span={12}>
          <Input
            name="email"
            title="Email"
            placeholder="Enter email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email}
          />
        </Column>

        <Column span={12}>
          <Select
            name="namePrefix"
            title="Name Prefix"
            selected={values.namePrefix}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.namePrefix && errors.namePrefix}
            mt={-0.5}
            options={formatOptions([
              "Mr.",
              "Miss",
              "Ms.",
              "Mrs.",
              "Dr.",
              "Prof.",
              "Honorable",
            ])}
          />
        </Column>
        <Column span={12}>
          <Input
            name="firstName"
            title="First Name"
            placeholder="Enter First Name"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.firstName && errors.firstName}
          />
        </Column>
        <Column span={12}>
          <Input
            name="lastName"
            title="Last Name"
            placeholder="Enter Last Name"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.lastName && errors.lastName}
          />
        </Column>
        <Column span={12}>
          <Input
            name="country"
            title="Country"
            placeholder="Enter Country"
            value={values.country}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.country && errors.country}
          />
        </Column>
        <Column span={12}>
          <Input
            name="postalCode"
            title="Postal Code"
            placeholder="Enter Postal Code"
            value={values.postalCode}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.postalCode && errors.postalCode}
          />
        </Column>
        <Column span={12}>
          <Input
            name="addressLine1"
            title="Address Line 1"
            placeholder="Enter Address Line 1"
            value={values.addressLine1}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.addressLine1 && errors.addressLine1}
          />
        </Column>
        <Column span={12}>
          <Input
            name="addressLine2"
            title="Address Line 2"
            placeholder="Enter Address Line 2"
            value={values.addressLine2}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.addressLine2 && errors.addressLine2}
          />
        </Column>
        <Column span={12}>
          <Input
            name="city"
            title="City"
            placeholder="Enter City"
            value={values.city}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.city && errors.city}
          />
        </Column>
        <Column span={12}>
          <Input
            name="region"
            title="Region"
            placeholder="Enter Region"
            value={values.region}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.region && errors.region}
          />
        </Column>
        <Column span={12}>
          <Input
            name="phoneNumber"
            title="Phone Number"
            placeholder="Enter Phone Number"
            value={values.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.phoneNumber && errors.phoneNumber}
          />
        </Column>
        <Column span={12}>
          <Select
            name="gender"
            title="Gender"
            selected={values.gender}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.gender && errors.gender}
            mt={-0.5}
            options={formatOptions(["Male", "Female", "Nonbinary", "n/a"])}
          />
        </Column>
        <Column span={12}>
          <Select
            name="maritalStatus"
            title="Marital Status"
            selected={values.maritalStatus}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.maritalStatus && errors.maritalStatus}
            mt={-0.5}
            options={formatOptions([
              "Married",
              "Single",
              "Divorced",
              "Widowed",
              "Separated",
              "Domestic Partner",
            ])}
          />
        </Column>
        <Column span={12}>
          <Input
            name="birthYear"
            title="Birth Year"
            placeholder="Enter Birth Year"
            value={values.birthYear}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.birthYear && errors.birthYear}
          />
        </Column>
        <Column span={12}>
          <Input
            name="spouse"
            title="Spouse"
            placeholder="Enter Spouse"
            value={values.spouse}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.spouse && errors.spouse}
          />
        </Column>
        <Column span={12}>
          <Input
            name="jobTitle"
            title="Job Title"
            placeholder="Enter Job Title"
            value={values.jobTitle}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.jobTitle && errors.jobTitle}
          />
        </Column>
        <Column span={12}>
          <Input
            name="employer"
            title="Employer"
            placeholder="Enter Employer"
            value={values.employer}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.employer && errors.employer}
          />
        </Column>
        <Column span={12}>
          <Input
            name="profession"
            title="Profession"
            placeholder="Enter Profession"
            value={values.profession}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.profession && errors.profession}
          />
        </Column>
        <Column span={12}>
          <Input
            name="salary"
            title="Salary"
            placeholder="Enter Salary"
            value={values.salary}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.salary && errors.salary}
          />
        </Column>
        <Column span={12}>
          <Select
            name="industry"
            title="Industry"
            selected={values.industry}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.industry && errors.industry}
            mt={-0.5}
            options={formatOptions([
              "Architecture & Planning",
              "Banking",
              "Consulting",
              "Education",
              "Entertainment",
              "Event Services",
              "Fashion",
              "Financial Services",
              "Fine Art",
              "Government",
              "Graphic Design",
              "Healthcare",
              "Hospitality",
              "Information Technology & Services",
              "Insurance",
              "Interior Design",
              "Legal Services",
              "Marketing & Advertising",
              "Mechanical or Industrial Engineering",
              "Media",
              "Motion Pictures & Film",
              "Museums & Institutions",
              "Music",
              "Oil & Energy",
              "Other",
              "Performing Arts",
              "Political Organizations",
              "Public Relations & Communications",
              "Publishing",
              "Real Estate",
              "Retail",
              "Student",
              "Technology",
              "Television",
              "Transportation/Trucking",
              "Utilities",
              "Venture Capital & Private Equity",
              "Writing & Editing",
            ])}
          />
        </Column>
        <Column span={12}>
          <Select
            name="buyerStatus"
            title="Buyer Status"
            selected={values.buyerStatus}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.buyerStatus && errors.buyerStatus}
            mt={-0.5}
            options={[
              {
                text: "Not Interested in Buying",
                value: "10",
              },
              {
                text: "Potential Buyer",
                value: "0",
              },
              {
                text: "Known Buyer",
                value: "20",
              },
            ]}
          />
        </Column>
        <Column span={12}>
          <Select
            name="priceRange"
            title="Price Range"
            selected={values.priceRange}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.priceRange && errors.priceRange}
            mt={-0.5}
            options={Object.entries({
              "Price Unknown": 0,
              $500: 10,
              "< $2,500": 20,
              "< $5,000": 30,
              "< $10,000": 40,
              "< $25,000": 50,
              "< $50,000": 60,
              "< $100,000": 70,
              "< $250,000": 80,
              "< $500,000": 90,
              "$500,000+": 100,
            }).map(([text, value]) => ({
              text,
              value: value.toString(),
            }))}
          />
        </Column>
        <Column span={12}>
          <Input
            name="workPhone"
            title="Work Phone"
            placeholder="Enter Work Phone"
            value={values.workPhone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.workPhone && errors.workPhone}
          />
        </Column>
        <Column span={12}>
          <Input
            name="mobilePhone"
            title="Mobile Phone"
            placeholder="Enter Mobile Phone"
            value={values.mobilePhone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.mobilePhone && errors.mobilePhone}
          />
        </Column>
        <Column span={12}>
          <Input
            name="fax"
            title="Fax"
            placeholder="Enter Fax"
            value={values.fax}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.fax && errors.fax}
          />
        </Column>
        <Column span={12}>
          <Input
            name="alternativeEmail"
            title="Alternative Email"
            placeholder="Enter Alternative Email"
            value={values.alternativeEmail}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.alternativeEmail && errors.alternativeEmail}
          />
        </Column>
        <Column span={12}>
          <Checkbox
            onSelect={(selected) => {
              setFieldValue("auctionDenyList", selected)
            }}
            selected={values.auctionDenyList}
          >
            Auction Deny List
          </Checkbox>
        </Column>
        <Column span={12}>
          <TextArea
            name="notes"
            placeholder="Enter Notes"
            value={values.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.notes && errors.notes}
          />
        </Column>
      </GridColumns>
    </>
  )
}

const formatOptions = (options: string[]) => {
  const formattedOptions = options.map((option) => ({
    text: option,
    value: option,
  }))
  return formattedOptions
}
