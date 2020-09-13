import React from "react";
import { Anchor, Grid, Layout, PageHeader, Typography, Divider, Button } from "antd";
import { GithubOutlined, LinkedinOutlined, MailOutlined, ArrowUpOutlined } from "@ant-design/icons";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Desktop } from "../components/ScreenSize";
import { LINK_EMAIL, LINK_GITHUB, LINK_LINKEDIN } from "../utils/constants";
import { scrollToTop } from "../utils";
import "./LegalNotice.less";

const { useBreakpoint } = Grid;
const { Link } = Anchor;
const { Title } = Typography;
const { Content, Sider } = Layout;

const LegalNotice = () => {
  const affix = useBreakpoint().lg;

  return (
    <>
      <NavBar />
      <Layout className="legal-notice">
        <Desktop>
          <Sider>
            <Anchor affix={affix} offsetTop={76}>
              <Link href="#tldr" title={"TL;DR"} />
              <Link href="#contact" title={"Contact"} />
              <Link href="#term" title={"Term and condition"}>
                <Link href="#account" title={"Account"} />
                <Link href="#cookie" title={"Cookie"} />
                <Link href="#license" title={"License"} />
                <Link href="#removal" title={"Removal of links from our website"} />
                <Link href="#no-warranties" title={"Disclaimers; No Warranties"} />
                <Link href="#liability" title={"Limitation of Liability and Damages"} />
                <Link href="#right" title={"Reservation of Rights"} />
              </Link>
              <Link href="#privacy" title={"Privacy policy"}>
                <Link href="#collect-data" title={"Information Collection"} />
                <Link href="#use-data" title={"Use of Data"} />
                <Link href="#transfer-data" title={"Transfer Of Data"} />
                <Link href="#disclosure-data" title={"Disclosure Of Data"} />
                <Link href="#security-data" title="Security Of Data" />
                <Link href="#service" title={"Service Providers"} />
                <Link href="#change-policy" title={"Changes To This Privacy Policy"} />
              </Link>
            </Anchor>
          </Sider>
        </Desktop>
        <Content className="container">
          <PageHeader
            title={<Title level={2}>Legal notice</Title>}
            ghost={false}
            extra={<i>Last updated 2020-09-06</i>}
          />
          <div className="body">
            <Title level={3} id="tldr">
              TL;DR
            </Title>
            <ul>
              <li>You can use this website however you want, free of charge. Yay!</li>
              <li>We do NOT own or host any mangas on our site. We simply provide the bookmarking service.</li>
              <li>Your data will be used for this site only.</li>
              <li>We are NOT responsible for your misusage of this website.</li>
              <li>We reserve the right to add/change/remove features of the website or close it entirety.</li>
            </ul>

            <Title level={3} id="contact">
              Contact
            </Title>
            <p>
              If you need anything, you can contact me via &nbsp;&nbsp;&nbsp;&nbsp;
              <a href={LINK_EMAIL} rel="noopener noreferrer" target="_blank">
                <MailOutlined className="footer-icon" />
                Email
              </a>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;
              <a href={LINK_GITHUB} rel="noopener noreferrer" target="_blank">
                <GithubOutlined className="footer-icon" />
                Github
              </a>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp; or &nbsp;&nbsp;&nbsp;&nbsp;
              <a href={LINK_LINKEDIN} rel="noopener noreferrer" target="_blank">
                <LinkedinOutlined className="footer-icon" />
                Linkedin
              </a>
            </p>
            <br />
            <p>OK, here&apos;s the long version:</p>
            <br />

            <Divider />
            <Title level={3} id="term">
              Term and condition
            </Title>
            <p>
              By accessing this website we assume you accept these terms and conditions in full. Do not continue to use
              MangaBookmark&apos;s website if you do not accept all of the terms and conditions stated on this page.
            </p>
            <p>
              The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice
              and any or all Agreements: &quot;Client&quot;, &quot;You&quot; and &quot;Your&quot; refers to you, the
              person accessing this website and accepting the Company&apos;s terms and conditions. &quot;The
              Company&quot;, &quot;Ourselves&quot;, &quot;We&quot;, &quot;Our&quot; and &quot;Us&quot;, refers to our
              Company. &quot;Party&quot;, &quot;Parties&quot;, or &quot;Us&quot;, refers to both the Client and
              ourselves, or either the Client or ourselves. All terms refer to the offer, acceptance and consideration
              of payment necessary to undertake the process of our assistance to the Client in the most appropriate
              manner, whether by formal meetings of a fixed duration, or any other means, for the express purpose of
              meeting the Client&apos;s needs in respect of provision of the Company&apos;s stated services/products, in
              accordance with and subject to, prevailing law of . Any use of the above terminology or other words in the
              singular, plural, capitalisation and/or he/she or they, are taken as interchangeable and therefore as
              referring to same.
            </p>
            <h3 id="account">Account</h3>
            <p>
              In order to use certain features of the Website, you must register for an account. You may be asked to
              provide a password in connection with your account. You are solely responsible for maintaining the
              confidentiality of your account and password, and You agree to accept responsibility for all activities
              that occur under your account or password. You agree that the information You provide to MangaBookmark,
              whether at registration or at any other time, will be true, accurate, current, and complete. You also
              agree that You will ensure that this information is kept accurate and up-to-date at all times. If You have
              reason to believe that your account is no longer secure (e.g., in the event of a loss, theft or
              unauthorized disclosure or use of your account ID or password), then You agree to immediately notify
              MangaBookmark at &nbsp;
              <a href={LINK_EMAIL}>{LINK_EMAIL.slice(7)}</a>. You may be liable for the losses incurred by MangaBookmark
              or others due to any unauthorized use of your Website account.
            </p>
            <h3 id="cookie">Cookies</h3>
            <p>
              We employ the use of cookies. By using MangaBookmark&apos;s website you consent to the use of cookies in
              accordance with MangaBookmark&apos;s <a href="#privacy">privacy policy.</a>
            </p>
            <p>
              Most of the modern day interactive web sites use cookies to enable us to retrieve user details for each
              visit. Cookies are used in some areas of our site to enable the functionality of this area and ease of use
              for those people visiting.
            </p>
            <h3 id="license">License</h3>
            <p>
              Unless otherwise stated, materials on MangaBookmark are released to the public under &nbsp;
              <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">
                MIT licence.
              </a>
            </p>
            <h3 id="link">Hyperlinking to our Content</h3>
            <p> All organizations may link to our Web site without prior written approval.</p>
            <p>
              These organizations may link to our home page, to publications or to other Web site information so long as
              the link: (a) is not in any way misleading; (b) does not falsely imply sponsorship, endorsement or
              approval of the linking party and its products or services; and (c) fits within the context of the linking
              party&apos;s site.
            </p>
            <p>Organizations may hyperlink to our Web site as follows:</p>
            <ol>
              <li>By use of our corporate name; or</li>
              <li>By use of the uniform resource locator (Web address) being linked to; or</li>
              <li>
                By use of any other description of our Web site or material being linked to that makes sense within the
                context and format of content on the linking party&apos;s site.
              </li>
            </ol>
            <p>
              You are allowed create frames around our Web pages or use other techniques that alter in any way the
              visual presentation or appearance of our Web site.
            </p>
            <h3 id="removal">Removal of links from our website</h3>
            <p>
              If you find any link on our Web site or any linked web site objectionable for any reason, you may contact
              us about this. We will consider requests to remove links but will have no obligation to do so or to
              respond directly to you.
            </p>
            <p>
              Whilst we endeavour to ensure that the information on this website is correct, we do not warrant its
              completeness or accuracy; nor do we commit to ensuring that the website remains available or that the
              material on the website is kept up to date.
            </p>
            <h3 id="no-warranties">Disclaimers; No Warranties</h3>
            <p>
              <b>No Warranties.</b> The website, and all data, information, software, website materials, content, user
              content, reference sites, services, or applications made available in conjunction with or through the
              website, are provided on an &quot;as is,&quot; &quot;as available,&quot; and &quot;with all faults&quot;
              basis. To the fullest extent permissible pursuant to applicable law, MangaBookmark, and its affiliates and
              licensors, disclaim any and all warranties and conditions, whether statutory, express or implied,
              including, but not limited to, all implied warranties of merchantability, fitness for a particular
              purpose, title, and non-infringement. No advice or information, whether oral or written, obtained by you
              from MangaBookmark or through the website will create any warranty not expressly stated herein.
            </p>
            <p>
              <b>Content.</b> MangaBookmark, and its suppliers, licensors, and affiliates, do not warrant that the
              website or any data, user content, functions, or any other information offered on or through the website
              will be uninterrupted, or free of errors, viruses or other harmful components, and do not warrant that any
              of the foregoing will be corrected.
            </p>
            <p>
              <b>Harm to Your Computer.</b> You understand and agree that your use, access, download, or otherwise
              obtaining of content, website materials, software, or data through the website (including through any
              API&apos;s) is at your own discretion and risk, and that you will be solely responsible for any damage to
              your property (including your computer system) or loss of data that results therefrom.
            </p>
            <h3 id="liability">Limitation of Liability and Damages</h3>
            <p>
              <b>Limitation of Liability.</b> Under no circumstances, including, but not limited to, negligence, will
              MangaBookmark or its affiliates, contractors, employees, agents, or third-party partners, licensors, or
              suppliers be liable for any special, indirect, incidental, consequential, punitive, reliance, or exemplary
              damages (including without limitation damages arising from any unsuccessful court action or legal dispute,
              lost business, lost revenues or profits, loss of data, or any other pecuniary or non-pecuniary loss or
              damage of any nature whatsoever) arising out of or relating to the terms or your use of (or inability to
              use) the website or any reference sites, or any other interactions with MangaBookmark, even if
              MangaBookmark or a MangaBookmark authorized representative has been advised of the possibility of such
              damages. applicable law may not allow the limitation or exclusion of liability or incidental or
              consequential damages, so the above limitation or exclusion may not apply to you. in such cases,
              MangaBookmark&apos;s liability will be limited to the fullest extent permitted by applicable law.
            </p>
            <p>
              <b>Limitation of Damages. </b> In no event will MangaBookmark&apos;s or its affiliates&apos;,
              contractors&apos;, employees&apos;, agents&apos;, or third-party partners&apos;, licensors&apos;, or
              suppliers&apos; total liability to you for all damages, losses, and causes of action arising out of or
              relating to the terms or your use of the website or your interaction with other website users (whether in
              contract, tort (including negligence), warranty, or otherwise), exceed the amount paid by you, if any, for
              accessing the website during the twelve months immediately preceding the date of the claim or one hundred
              dollars, whichever is greater.
            </p>
            <h3 id="right">Reservation of Rights</h3>
            <p>
              We reserve the right at any time and in its sole discretion to request that you remove all links or any
              particular link to our Web site. You agree to immediately remove all links to our Web site upon such
              request. We also reserve the right to amend these terms and conditions and its linking policy at any time.
              By continuing to link to our Web site, you agree to be bound to and abide by these linking terms and
              conditions.
            </p>

            <br />
            <Divider />
            <Title level={3} id="privacy">
              Privacy policy
            </Title>

            <p>
              This page informs you of our policies regarding the collection, use, and disclosure of personal data when
              you use our Service and the choices you have associated with that data.{" "}
            </p>
            <p>
              We use your data to provide and improve the Service. By using the Service, you agree to the collection and
              use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms
              used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible from
              <a href="#term">here</a>
            </p>
            <h3 id="collect-data">Information Collection And Use</h3>
            <p>
              We collect several different types of information for various purposes to provide and improve our Service
              to you.
            </p>
            <b>Personal Data</b>
            <p>
              While using our Service, we may ask you to provide us with certain personally identifiable information
              that can be used to contact or identify you (&quot;Personal Data&quot;). Personally identifiable
              information may include, but is not limited to:
            </p>
            <ul>
              <li>Email address</li>
              <li>First name and last name</li>
              <li>Cookies and Usage Data</li>
            </ul>
            <b>Usage Data</b>
            <p>
              We may also collect information how the Service is accessed and used (&quot;Usage Data&quot;). This Usage
              Data may include information such as your computer&apos;s Internet Protocol address (e.g. IP address),
              browser type, browser version, the pages of our Service that you visit, the time and date of your visit,
              the time spent on those pages, unique device identifiers and other diagnostic data.
            </p>
            <b>Tracking & Cookies Data</b>
            <p>
              We use cookies and similar tracking technologies to track the activity on our Service and hold certain
              information.
            </p>
            <p>
              Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are
              sent to your browser from a website and stored on your device. Tracking technologies also used are
              beacons, tags, and scripts to collect and track information and to improve and analyze our Service.
            </p>
            <p>
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However,
              if you do not accept cookies, you may not be able to use some portions of our Service.
            </p>
            <p>Examples of Cookies we use:</p>
            <ul>
              <li>
                <i>Session Cookies.</i> We use Session Cookies to operate our Service.
              </li>
              <li>
                <i>Preference Cookies.</i> We use Preference Cookies to remember your preferences and various settings.
              </li>
              <li>
                <i>Security Cookies.</i> We use Security Cookies for security purposes.
              </li>
            </ul>
            <h3 id="use-data">Use of Data</h3>
            <p>MangaBookmark uses the collected data for various purposes:</p>
            <ul>
              <li>To provide and maintain the Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
              <li>To monitor the usage of the Service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
            <h3 id="transfer-data">Transfer Of Data</h3>
            <p>
              Your information, including Personal Data, may be transferred to — and maintained on — computers located
              outside of your state, province, country or other governmental jurisdiction where the data protection laws
              may differ than those from your jurisdiction.
            </p>
            <p>
              If you are located outside the United States of America (US) and choose to provide information to us,
              please note that we transfer the data, including Personal Data, to US and process it there.
            </p>
            <p>
              Your consent to this Privacy Policy followed by your submission of such information represents your
              agreement to that transfer.
            </p>
            <p>
              MangaBookmark will take all steps reasonably necessary to ensure that your data is treated securely and in
              accordance with this Privacy Policy and no transfer of your Personal Data will take place to an
              organization or a country unless there are adequate controls in place including the security of your data
              and other personal information.
            </p>
            <h3 id="disclosure-data">Disclosure Of Data</h3>
            <h5>Legal Requirements</h5>
            <p>
              MangaBookmark may disclose your Personal Data in the good faith belief that such action is necessary to:
            </p>
            <ul>
              <li>To comply with a legal obligation</li>
              <li>To protect and defend the rights or property of MangaBookmark</li>
              <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
              <li>To protect the personal safety of users of the Service or the public</li>
              <li>To protect against legal liability</li>
            </ul>
            <h3 id="security-data">Security Of Data</h3>
            <p>
              The security of your data is important to us, but remember that no method of transmission over the
              Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable
              means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
            <h3 id="link-to-other">Links To Other Sites</h3>
            <p>
              Our Service may contain links to other sites that are not operated by us. If you click on a third party
              link, you will be directed to that third party&apos;s site. We strongly advise you to review the Privacy
              Policy of every site you visit.
            </p>
            <p>
              We have no control over and assume no responsibility for the content, privacy policies or practices of any
              third party sites or services.
            </p>
            <h3 id="change-policy">Changes To This Privacy Policy</h3>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page.
            </p>
            <p>
              We will let you know via email and/or a prominent notice on our Service, prior to the change becoming
              effective and update the &quot;effective date&quot; at the top of this Privacy Policy.
            </p>
            <p>
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy
              are effective when they are posted on this page.
            </p>

            <div className="text-align-center">
              <Button type="link" size="large" icon={<ArrowUpOutlined />} onClick={scrollToTop}>
                Back to top
              </Button>
            </div>
          </div>
        </Content>
      </Layout>
      <Footer />
    </>
  );
};

export default LegalNotice;
