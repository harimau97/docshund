import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { initDB, addData, loadData } from "./indexedDB/indexedDB.jsx";
import loadingGif from "../../assets/loading.gif";
import axios from "axios";

// npm run dev를 했을 경우 useEffect가 두 번 실행되기 때문에 console에서 addData를 실행할 수 없다는 에러가 출력됩니다.
// 실제 배포했을 때는 발생하지 않습니다.
const TranslateViewer = () => {
  const { docsName } = useParams();
  const [docParts, setDocParts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [processedCount, setProcessedCount] = useState(0);
  const docData = useRef([]);
  const loadingRef = useRef(null);
  const chunk_size = 20;

  //indexedDB 관련 변수
  const dbName = "docs"; //DB 이름
  const objectStoreName = docsName; //객체저장소(테이블) 이름
  const [isDbInitialized, setIsDbInitialized] = useState(false);

  useEffect(() => {
    async function checkDB() {
      setLoading(true);
      try {
        await initDB(dbName, objectStoreName);
        const loadedData = await loadData(objectStoreName);

        if (loadedData.length === 0) {
          console.log("db에 데이터가 없습니다. 데이터 가져오기 시작...");
          setLoading(true);
          try {
            // const response = await axios.get(
            //   "http://localhost:8080/api/docs/docParts"
            // );
            // const data = response.data;
            const data = [{
              "tag": "ul",
              "content": "<ul class=\"top-nav-list\">\n<li class=\"top-nav-item\" role=\"menuitem\">\n<a aria-expanded=\"false\" aria-haspopup=\"true\" class=\"top-nav-item-anchor\" href=\"#\">\n\t\t\t\t\t\t\tGet Started\n\t\t\t\t\t\t</a>\n<ul aria-hidden=\"true\" class=\"top-nav-menu\" role=\"menu\" title=\"Get Started\">\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/intro\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tIntroduction\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/quickstart\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tQuickstart\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/uses\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tUse Cases\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/books-and-papers\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tBooks &amp; Papers\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/videos\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tVideos\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/podcasts\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tPodcasts\n\t\t\t\t\t\t\t\t</a>\n</li>\n</ul>\n</li>\n<li class=\"top-nav-item\" role=\"menuitem\">\n<a aria-controls=\"nav-documentation-menu\" aria-expanded=\"false\" aria-haspopup=\"true\" class=\"top-nav-item-anchor\" href=\"/documentation\">\n\t\t\t\t\t\t\tDocs\n\t\t\t\t\t\t</a>\n<ul aria-hidden=\"true\" class=\"top-nav-menu\" id=\"nav-documentation-menu\" role=\"menu\" title=\"Docs\">\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/documentation#gettingStarted\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tKey Concepts\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/documentation#api\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tAPIs\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/documentation#configuration\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tConfiguration\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/documentation#design\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tDesign\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/documentation#implementation\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tImplementation\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/documentation#operations\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tOperations\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/documentation#security\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tSecurity\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"https://cwiki.apache.org/confluence/display/KAFKA/Clients\" tabindex=\"-1\" target=\"_blank\">\n\t\t\t\t\t\t\t\t\tClients\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/documentation#connect\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tKafka Connect\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/documentation/streams\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tKafka Streams\n\t\t\t\t\t\t\t\t</a>\n</li>\n</ul>\n</li>\n<li class=\"top-nav-item\" role=\"menuitem\">\n<a class=\"top-nav-item-anchor\" href=\"/powered-by\">\n\t\t\t\t\t\t\tPowered By\n\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-item\" role=\"menuitem\">\n<a aria-controls=\"nav-community-menu\" aria-expanded=\"false\" aria-haspopup=\"true\" class=\"top-nav-item-anchor\" href=\"#\">\n\t\t\t\t\t\t\tCommunity\n\t\t\t\t\t\t</a>\n<ul aria-hidden=\"true\" class=\"top-nav-menu\" id=\"nav-community-menu\" role=\"menu\" title=\"Community\">\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/blog\" tabindex=\"-1\" target=\"_blank\">\n\t\t\t\t\t\t\t\t\tBlog\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"https://kafka-summit.org/\" tabindex=\"-1\" target=\"_blank\">\n\t\t\t\t\t\t\t\t\tKafka Summit\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/project\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tProject Info\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/trademark\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tTrademark\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"https://cwiki.apache.org/confluence/display/KAFKA/Ecosystem\" tabindex=\"-1\" target=\"_blank\">\n\t\t\t\t\t\t\t\t\tEcosystem\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/events\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tEvents\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/contact\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tContact us\n\t\t\t\t\t\t\t\t</a>\n</li>\n</ul>\n</li>\n<li class=\"top-nav-item\" role=\"menuitem\">\n<a aria-controls=\"nav-community-menu\" aria-expanded=\"false\" aria-haspopup=\"true\" class=\"top-nav-item-anchor\" href=\"#\">\n\t\t\t\t\t\t\tApache\n\t\t\t\t\t\t</a>\n<ul aria-hidden=\"true\" class=\"top-nav-menu\" id=\"nav-community-menu\" role=\"menu\" title=\"Community\">\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"https://www.apache.org/licenses/\" tabindex=\"-1\" target=\"_blank\">\n\t\t\t\t\t\t\t\t\tLicense\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"https://www.apache.org/foundation/sponsorship.html\" tabindex=\"-1\" target=\"_blank\">\n\t\t\t\t\t\t\t\t\tDonate\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"https://www.apache.org/foundation/thanks.html\" tabindex=\"-1\" target=\"_blank\">\n\t\t\t\t\t\t\t\t\tSponsors\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"https://www.apache.org/security/\" tabindex=\"-1\" target=\"_blank\">\n\t\t\t\t\t\t\t\t\tSecurity\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"https://privacy.apache.org/policies/privacy-policy-public.html\" tabindex=\"-1\" target=\"_blank\">\n\t\t\t\t\t\t\t\t\tPrivacy\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"https://www.apache.org/\" tabindex=\"-1\" target=\"_blank\">\n\t\t\t\t\t\t\t\t\tApache.org\n\t\t\t\t\t\t\t\t</a>\n</li>\n</ul>\n</li>\n<li class=\"top-nav-item\" role=\"menuitem\">\n<a class=\"top-nav-download\" href=\"/downloads\" id=\"top-nav-download\" tabindex=\"-1\">\n\t\t\t\t\t\t\tDownload Kafka\n\t\t\t\t\t\t</a>\n</li>\n</ul>",
              "porder": 1
            },
            {
              "tag": "ul",
              "content": "<ul aria-hidden=\"true\" class=\"top-nav-menu\" role=\"menu\" title=\"Get Started\">\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/intro\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tIntroduction\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/quickstart\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tQuickstart\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/uses\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tUse Cases\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/books-and-papers\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tBooks &amp; Papers\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/videos\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tVideos\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/podcasts\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tPodcasts\n\t\t\t\t\t\t\t\t</a>\n</li>\n</ul>",
              "porder": 2
            },
            {
              "tag": "ul",
              "content": "<ul aria-hidden=\"true\" class=\"top-nav-menu\" id=\"nav-documentation-menu\" role=\"menu\" title=\"Docs\">\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/documentation#gettingStarted\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tKey Concepts\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/documentation#api\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tAPIs\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/documentation#configuration\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tConfiguration\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/documentation#design\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tDesign\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/documentation#implementation\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tImplementation\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/documentation#operations\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tOperations\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/documentation#security\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tSecurity\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"https://cwiki.apache.org/confluence/display/KAFKA/Clients\" tabindex=\"-1\" target=\"_blank\">\n\t\t\t\t\t\t\t\t\tClients\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/documentation#connect\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tKafka Connect\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/documentation/streams\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tKafka Streams\n\t\t\t\t\t\t\t\t</a>\n</li>\n</ul>",
              "porder": 3
            },
            {
              "tag": "ul",
              "content": "<ul aria-hidden=\"true\" class=\"top-nav-menu\" id=\"nav-community-menu\" role=\"menu\" title=\"Community\">\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/blog\" tabindex=\"-1\" target=\"_blank\">\n\t\t\t\t\t\t\t\t\tBlog\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"https://kafka-summit.org/\" tabindex=\"-1\" target=\"_blank\">\n\t\t\t\t\t\t\t\t\tKafka Summit\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/project\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tProject Info\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/trademark\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tTrademark\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"https://cwiki.apache.org/confluence/display/KAFKA/Ecosystem\" tabindex=\"-1\" target=\"_blank\">\n\t\t\t\t\t\t\t\t\tEcosystem\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/events\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tEvents\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"/contact\" tabindex=\"-1\">\n\t\t\t\t\t\t\t\t\tContact us\n\t\t\t\t\t\t\t\t</a>\n</li>\n</ul>",
              "porder": 4
            },
            {
              "tag": "ul",
              "content": "<ul aria-hidden=\"true\" class=\"top-nav-menu\" id=\"nav-community-menu\" role=\"menu\" title=\"Community\">\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"https://www.apache.org/licenses/\" tabindex=\"-1\" target=\"_blank\">\n\t\t\t\t\t\t\t\t\tLicense\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"https://www.apache.org/foundation/sponsorship.html\" tabindex=\"-1\" target=\"_blank\">\n\t\t\t\t\t\t\t\t\tDonate\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"https://www.apache.org/foundation/thanks.html\" tabindex=\"-1\" target=\"_blank\">\n\t\t\t\t\t\t\t\t\tSponsors\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"https://www.apache.org/security/\" tabindex=\"-1\" target=\"_blank\">\n\t\t\t\t\t\t\t\t\tSecurity\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"https://privacy.apache.org/policies/privacy-policy-public.html\" tabindex=\"-1\" target=\"_blank\">\n\t\t\t\t\t\t\t\t\tPrivacy\n\t\t\t\t\t\t\t\t</a>\n</li>\n<li class=\"top-nav-menu-item\" role=\"menuitem\">\n<a class=\"top-nav-anchor\" href=\"https://www.apache.org/\" tabindex=\"-1\" target=\"_blank\">\n\t\t\t\t\t\t\t\t\tApache.org\n\t\t\t\t\t\t\t\t</a>\n</li>\n</ul>",
              "porder": 5
            },
            {
              "tag": "ul",
              "content": "<ul class=\"toc\">\n<li><a href=\"#gettingStarted\">1. Getting Started</a>\n<ul>\n<li><a href=\"#introduction\">1.1 Introduction</a>\n<li><a href=\"#uses\">1.2 Use Cases</a>\n<li><a href=\"#quickstart\">1.3 Quick Start</a>\n<li><a href=\"#ecosystem\">1.4 Ecosystem</a>\n<li><a href=\"#upgrade\">1.5 Upgrading</a>\n<li><a href=\"#docker\">1.6 Docker</a>\n</li></li></li></li></li></li></ul>\n<li><a href=\"#api\">2. APIs</a>\n<ul>\n<li><a href=\"#producerapi\">2.1 Producer API</a>\n<li><a href=\"#consumerapi\">2.2 Consumer API</a>\n<li><a href=\"/{{version}}/documentation/streams\">2.3 Streams API</a>\n<li><a href=\"#connectapi\">2.4 Connect API</a>\n<li><a href=\"#adminapi\">2.5 Admin API</a>\n</li></li></li></li></li></ul>\n<li><a href=\"#configuration\">3. Configuration</a>\n<ul>\n<li><a href=\"#brokerconfigs\">3.1 Broker Configs</a>\n<li><a href=\"#topicconfigs\">3.2 Topic Configs</a>\n<li><a href=\"#producerconfigs\">3.3 Producer Configs</a>\n<li><a href=\"#consumerconfigs\">3.4 Consumer Configs</a>\n<li><a href=\"#connectconfigs\">3.5 Kafka Connect Configs</a>\n<ul>\n<li><a href=\"#sourceconnectconfigs\">Source Connector Configs</a>\n<li><a href=\"#sinkconnectconfigs\">Sink Connector Configs</a>\n</li></li></ul>\n<li><a href=\"#streamsconfigs\">3.6 Kafka Streams Configs</a>\n<li><a href=\"#adminclientconfigs\">3.7 AdminClient Configs</a>\n<li><a href=\"#mirrormakerconfigs\">3.8 MirrorMaker Configs</a>\n<li><a href=\"#systemproperties\">3.9 System Properties</a>\n<li><a href=\"#tieredstorageconfigs\">3.10 Tiered Storage Configs</a>\n<li><a href=\"#config_providers\">3.11 Configuration Providers</a>\n<ul>\n<li><a href=\"#using_config_providers\">Using Configuration Providers</a>\n<li><a href=\"#directory_config_provider\">DirectoryConfigProvider</a>\n<li><a href=\"#env_var_config_provider\">EnvVarConfigProvider</a>\n<li><a href=\"#file_config_provider\">FileConfigProvider</a>\n<li><a href=\"#ref_config_provider\">Example: Referencing Files</a>\n</li></li></li></li></li></ul>\n</li></li></li></li></li></li></li></li></li></li></li></ul>\n<li><a href=\"#design\">4. Design</a>\n<ul>\n<li><a href=\"#majordesignelements\">4.1 Motivation</a>\n<li><a href=\"#persistence\">4.2 Persistence</a>\n<li><a href=\"#maximizingefficiency\">4.3 Efficiency</a>\n<li><a href=\"#theproducer\">4.4 The Producer</a>\n<li><a href=\"#theconsumer\">4.5 The Consumer</a>\n<li><a href=\"#semantics\">4.6 Message Delivery Semantics</a>\n<li><a href=\"#replication\">4.7 Replication</a>\n<li><a href=\"#compaction\">4.8 Log Compaction</a>\n<li><a href=\"#design_quotas\">4.9 Quotas</a>\n</li></li></li></li></li></li></li></li></li></ul>\n<li><a href=\"#implementation\">5. Implementation</a>\n<ul>\n<li><a href=\"#networklayer\">5.1 Network Layer</a>\n<li><a href=\"#messages\">5.2 Messages</a>\n<li><a href=\"#messageformat\">5.3 Message format</a>\n<li><a href=\"#log\">5.4 Log</a>\n<li><a href=\"#distributionimpl\">5.5 Distribution</a>\n</li></li></li></li></li></ul>\n<li><a href=\"#operations\">6. Operations</a>\n<ul>\n<li><a href=\"#basic_ops\">6.1 Basic Kafka Operations</a>\n<ul>\n<li><a href=\"#basic_ops_add_topic\">Adding and removing topics</a>\n<li><a href=\"#basic_ops_modify_topic\">Modifying topics</a>\n<li><a href=\"#basic_ops_restarting\">Graceful shutdown</a>\n<li><a href=\"#basic_ops_leader_balancing\">Balancing leadership</a>\n<li><a href=\"#basic_ops_racks\">Balancing Replicas Across Racks</a>\n<li><a href=\"#basic_ops_mirror_maker\">Mirroring data between clusters</a>\n<li><a href=\"#basic_ops_consumer_lag\">Checking consumer position</a>\n<li><a href=\"#basic_ops_consumer_group\">Managing Consumer Groups</a>\n<li><a href=\"#basic_ops_cluster_expansion\">Expanding your cluster</a>\n<li><a href=\"#basic_ops_decommissioning_brokers\">Decommissioning brokers</a>\n<li><a href=\"#basic_ops_increase_replication_factor\">Increasing replication factor</a>\n<li><a href=\"#rep-throttle\">Limiting Bandwidth Usage during Data Migration</a>\n<li><a href=\"#quotas\">Setting quotas</a>\n</li></li></li></li></li></li></li></li></li></li></li></li></li></ul>\n<li><a href=\"#datacenters\">6.2 Datacenters</a>\n<li><a href=\"#georeplication\">6.3 Geo-Replication (Cross-Cluster Data Mirroring)</a>\n<ul>\n<li><a href=\"#georeplication-overview\">Geo-Replication Overview</a>\n<li><a href=\"#georeplication-flows\">What Are Replication Flows</a>\n<li><a href=\"#georeplication-mirrormaker\">Configuring Geo-Replication</a>\n<li><a href=\"#georeplication-starting\">Starting Geo-Replication</a>\n<li><a href=\"#georeplication-stopping\">Stopping Geo-Replication</a>\n<li><a href=\"#georeplication-apply-config-changes\">Applying Configuration Changes</a>\n<li><a href=\"#georeplication-monitoring\">Monitoring Geo-Replication</a>\n</li></li></li></li></li></li></li></ul>\n<li><a href=\"#multitenancy\">6.4 Multi-Tenancy</a>\n<ul>\n<li><a href=\"#multitenancy-overview\">Multi-Tenancy Overview</a>\n<li><a href=\"#multitenancy-topic-naming\">Creating User Spaces (Namespaces)</a>\n<li><a href=\"#multitenancy-topic-configs\">Configuring Topics</a>\n<li><a href=\"#multitenancy-security\">Securing Clusters and Topics</a>\n<li><a href=\"#multitenancy-isolation\">Isolating Tenants</a>\n<li><a href=\"#multitenancy-monitoring\">Monitoring and Metering</a>\n<li><a href=\"#multitenancy-georeplication\">Multi-Tenancy and Geo-Replication</a>\n<li><a href=\"#multitenancy-more\">Further considerations</a>\n</li></li></li></li></li></li></li></li></ul>\n<li><a href=\"#config\">6.5 Important Configs</a>\n<ul>\n<li><a href=\"#clientconfig\">Important Client Configs</a>\n<li><a href=\"#prodconfig\">A Production Server Configs</a>\n</li></li></ul>\n<li><a href=\"#java\">6.6 Java Version</a>\n<li><a href=\"#hwandos\">6.7 Hardware and OS</a>\n<ul>\n<li><a href=\"#os\">OS</a>\n<li><a href=\"#diskandfs\">Disks and Filesystems</a>\n<li><a href=\"#appvsosflush\">Application vs OS Flush Management</a>\n<li><a href=\"#linuxflush\">Linux Flush Behavior</a>\n<li><a href=\"#filesystems\">Filesystem Selection</a>\n<li><a href=\"#replace_disk\">Replace KRaft Controller Disk</a>\n</li></li></li></li></li></li></ul>\n<li><a href=\"#monitoring\">6.8 Monitoring</a>\n<ul>\n<li><a href=\"#remote_jmx\">Security Considerations for Remote Monitoring using JMX</a>\n<li><a href=\"#tiered_storage_monitoring\">Tiered Storage Monitoring</a>\n<li><a href=\"#kraft_monitoring\">KRaft Monitoring</a>\n<li><a href=\"#selector_monitoring\">Selector Monitoring</a>\n<li><a href=\"#common_node_monitoring\">Common Node Monitoring</a>\n<li><a href=\"#producer_monitoring\">Producer Monitoring</a>\n<li><a href=\"#consumer_monitoring\">Consumer Monitoring</a>\n<li><a href=\"#connect_monitoring\">Connect Monitoring</a>\n<li><a href=\"#kafka_streams_monitoring\">Streams Monitoring</a>\n<li><a href=\"#others_monitoring\">Others</a>\n</li></li></li></li></li></li></li></li></li></li></ul>\n<li><a href=\"#zk\">6.9 ZooKeeper</a>\n<ul>\n<li><a href=\"#zkversion\">Stable Version</a>\n<li><a href=\"#zk_depr\">ZooKeeper Deprecation</a>\n<li><a href=\"#zkops\">Operationalization</a>\n</li></li></li></ul>\n<li><a href=\"#kraft\">6.10 KRaft</a>\n<ul>\n<li><a href=\"#kraft_config\">Configuration</a>\n<li><a href=\"#kraft_storage\">Storage Tool</a>\n<li><a href=\"#kraft_debug\">Debugging</a>\n<li><a href=\"#kraft_deployment\">Deploying Considerations</a>\n<li><a href=\"#kraft_missing\">Missing Features</a>\n<li><a href=\"#kraft_zk_migration\">ZooKeeper to KRaft Migration</a>\n</li></li></li></li></li></li></ul>\n<li><a href=\"#tiered_storage\">6.11 Tiered Storage</a>\n<ul>\n<li><a href=\"#tiered_storage_overview\">Tiered Storage Overview</a>\n<li><a href=\"#tiered_storage_config\">Configuration</a>\n<li><a href=\"#tiered_storage_config_ex\">Quick Start Example</a>\n<li><a href=\"#tiered_storage_limitation\">Limitations</a>\n</li></li></li></li></ul>\n</li></li></li></li></li></li></li></li></li></li></li></ul>\n<li><a href=\"#security\">7. Security</a>\n<ul>\n<li><a href=\"#security_overview\">7.1 Security Overview</a>\n<li><a href=\"#listener_configuration\">7.2 Listener Configuration</a>\n<li><a href=\"#security_ssl\">7.3 Encryption and Authentication using SSL</a>\n<li><a href=\"#security_sasl\">7.4 Authentication using SASL</a>\n<li><a href=\"#security_authz\">7.5 Authorization and ACLs</a>\n<li><a href=\"#security_rolling_upgrade\">7.6 Incorporating Security Features in a Running Cluster</a>\n<li><a href=\"#zk_authz\">7.7 ZooKeeper Authentication</a>\n<ul>\n<li><a href=\"#zk_authz_new\">New Clusters</a>\n<ul>\n<li><a href=\"#zk_authz_new_sasl\">ZooKeeper SASL Authentication</a>\n<li><a href=\"#zk_authz_new_mtls\">ZooKeeper Mutual TLS Authentication</a>\n</li></li></ul>\n<li><a href=\"#zk_authz_migration\">Migrating Clusters</a>\n<li><a href=\"#zk_authz_ensemble\">Migrating the ZooKeeper Ensemble</a>\n<li><a href=\"#zk_authz_quorum\">ZooKeeper Quorum Mutual TLS Authentication</a>\n</li></li></li></li></ul>\n<li><a href=\"#zk_encryption\">7.8 ZooKeeper Encryption</a>\n</li></li></li></li></li></li></li></li></ul>\n<li><a href=\"#connect\">8. Kafka Connect</a>\n<ul>\n<li><a href=\"#connect_overview\">8.1 Overview</a>\n<li><a href=\"#connect_user\">8.2 User Guide</a>\n<ul>\n<li><a href=\"#connect_running\">Running Kafka Connect</a>\n<li><a href=\"#connect_configuring\">Configuring Connectors</a>\n<li><a href=\"#connect_transforms\">Transformations</a>\n<li><a href=\"#connect_rest\">REST API</a>\n<li><a href=\"#connect_errorreporting\">Error Reporting in Connect</a>\n<li><a href=\"#connect_exactlyonce\">Exactly-once support</a>\n<li><a href=\"#connect_plugindiscovery\">Plugin Discovery</a>\n</li></li></li></li></li></li></li></ul>\n<li><a href=\"#connect_development\">8.3 Connector Development Guide</a>\n<ul>\n<li><a href=\"#connect_concepts\">Core Concepts and APIs</a>\n<li><a href=\"#connect_developing\">Developing a Simple Connector</a>\n<li><a href=\"#connect_dynamicio\">Dynamic Input/Output Streams</a>\n<li><a href=\"#connect_configs\">Configuration Validation</a>\n<li><a href=\"#connect_schemas\">Working with Schemas</a>\n</li></li></li></li></li></ul>\n<li><a href=\"#connect_administration\">8.4 Administration</a>\n</li></li></li></li></ul>\n<li><a href=\"/{{version}}/documentation/streams\">9. Kafka Streams</a>\n<ul>\n<li><a href=\"/{{version}}/documentation/streams/quickstart\">9.1 Play with a Streams Application</a>\n<li><a href=\"/{{version}}/documentation/streams/tutorial\">9.2 Write your own Streams Applications</a>\n<li><a href=\"/{{version}}/documentation/streams/developer-guide\">9.3 Developer Manual</a>\n<li><a href=\"/{{version}}/documentation/streams/core-concepts\">9.4 Core Concepts</a>\n<li><a href=\"/{{version}}/documentation/streams/architecture\">9.5 Architecture</a>\n<li><a href=\"/{{version}}/documentation/streams/upgrade-guide\">9.6 Upgrade Guide</a>\n</li></li></li></li></li></li></ul>\n</li></li></li></li></li></li></li></li></li></ul>",
              "porder": 6
            },
            {
              "tag": "ul",
              "content": "<ul>\n<li><a href=\"#introduction\">1.1 Introduction</a>\n<li><a href=\"#uses\">1.2 Use Cases</a>\n<li><a href=\"#quickstart\">1.3 Quick Start</a>\n<li><a href=\"#ecosystem\">1.4 Ecosystem</a>\n<li><a href=\"#upgrade\">1.5 Upgrading</a>\n<li><a href=\"#docker\">1.6 Docker</a>\n</li></li></li></li></li></li></ul>",
              "porder": 7
            },
            {
              "tag": "ul",
              "content": "<ul>\n<li><a href=\"#producerapi\">2.1 Producer API</a>\n<li><a href=\"#consumerapi\">2.2 Consumer API</a>\n<li><a href=\"/{{version}}/documentation/streams\">2.3 Streams API</a>\n<li><a href=\"#connectapi\">2.4 Connect API</a>\n<li><a href=\"#adminapi\">2.5 Admin API</a>\n</li></li></li></li></li></ul>",
              "porder": 8
            },
            {
              "tag": "ul",
              "content": "<ul>\n<li><a href=\"#brokerconfigs\">3.1 Broker Configs</a>\n<li><a href=\"#topicconfigs\">3.2 Topic Configs</a>\n<li><a href=\"#producerconfigs\">3.3 Producer Configs</a>\n<li><a href=\"#consumerconfigs\">3.4 Consumer Configs</a>\n<li><a href=\"#connectconfigs\">3.5 Kafka Connect Configs</a>\n<ul>\n<li><a href=\"#sourceconnectconfigs\">Source Connector Configs</a>\n<li><a href=\"#sinkconnectconfigs\">Sink Connector Configs</a>\n</li></li></ul>\n<li><a href=\"#streamsconfigs\">3.6 Kafka Streams Configs</a>\n<li><a href=\"#adminclientconfigs\">3.7 AdminClient Configs</a>\n<li><a href=\"#mirrormakerconfigs\">3.8 MirrorMaker Configs</a>\n<li><a href=\"#systemproperties\">3.9 System Properties</a>\n<li><a href=\"#tieredstorageconfigs\">3.10 Tiered Storage Configs</a>\n<li><a href=\"#config_providers\">3.11 Configuration Providers</a>\n<ul>\n<li><a href=\"#using_config_providers\">Using Configuration Providers</a>\n<li><a href=\"#directory_config_provider\">DirectoryConfigProvider</a>\n<li><a href=\"#env_var_config_provider\">EnvVarConfigProvider</a>\n<li><a href=\"#file_config_provider\">FileConfigProvider</a>\n<li><a href=\"#ref_config_provider\">Example: Referencing Files</a>\n</li></li></li></li></li></ul>\n</li></li></li></li></li></li></li></li></li></li></li></ul>",
              "porder": 9
            },
            {
              "tag": "ul",
              "content": "<ul>\n<li><a href=\"#sourceconnectconfigs\">Source Connector Configs</a>\n<li><a href=\"#sinkconnectconfigs\">Sink Connector Configs</a>\n</li></li></ul>",
              "porder": 10
            },
            {
              "tag": "ul",
              "content": "<ul>\n<li><a href=\"#using_config_providers\">Using Configuration Providers</a>\n<li><a href=\"#directory_config_provider\">DirectoryConfigProvider</a>\n<li><a href=\"#env_var_config_provider\">EnvVarConfigProvider</a>\n<li><a href=\"#file_config_provider\">FileConfigProvider</a>\n<li><a href=\"#ref_config_provider\">Example: Referencing Files</a>\n</li></li></li></li></li></ul>",
              "porder": 11
            },
            {
              "tag": "ul",
              "content": "<ul>\n<li><a href=\"#majordesignelements\">4.1 Motivation</a>\n<li><a href=\"#persistence\">4.2 Persistence</a>\n<li><a href=\"#maximizingefficiency\">4.3 Efficiency</a>\n<li><a href=\"#theproducer\">4.4 The Producer</a>\n<li><a href=\"#theconsumer\">4.5 The Consumer</a>\n<li><a href=\"#semantics\">4.6 Message Delivery Semantics</a>\n<li><a href=\"#replication\">4.7 Replication</a>\n<li><a href=\"#compaction\">4.8 Log Compaction</a>\n<li><a href=\"#design_quotas\">4.9 Quotas</a>\n</li></li></li></li></li></li></li></li></li></ul>",
              "porder": 12
            },
            {
              "tag": "ul",
              "content": "<ul>\n<li><a href=\"#networklayer\">5.1 Network Layer</a>\n<li><a href=\"#messages\">5.2 Messages</a>\n<li><a href=\"#messageformat\">5.3 Message format</a>\n<li><a href=\"#log\">5.4 Log</a>\n<li><a href=\"#distributionimpl\">5.5 Distribution</a>\n</li></li></li></li></li></ul>",
              "porder": 13
            },
            {
              "tag": "ul",
              "content": "<ul>\n<li><a href=\"#basic_ops\">6.1 Basic Kafka Operations</a>\n<ul>\n<li><a href=\"#basic_ops_add_topic\">Adding and removing topics</a>\n<li><a href=\"#basic_ops_modify_topic\">Modifying topics</a>\n<li><a href=\"#basic_ops_restarting\">Graceful shutdown</a>\n<li><a href=\"#basic_ops_leader_balancing\">Balancing leadership</a>\n<li><a href=\"#basic_ops_racks\">Balancing Replicas Across Racks</a>\n<li><a href=\"#basic_ops_mirror_maker\">Mirroring data between clusters</a>\n<li><a href=\"#basic_ops_consumer_lag\">Checking consumer position</a>\n<li><a href=\"#basic_ops_consumer_group\">Managing Consumer Groups</a>\n<li><a href=\"#basic_ops_cluster_expansion\">Expanding your cluster</a>\n<li><a href=\"#basic_ops_decommissioning_brokers\">Decommissioning brokers</a>\n<li><a href=\"#basic_ops_increase_replication_factor\">Increasing replication factor</a>\n<li><a href=\"#rep-throttle\">Limiting Bandwidth Usage during Data Migration</a>\n<li><a href=\"#quotas\">Setting quotas</a>\n</li></li></li></li></li></li></li></li></li></li></li></li></li></ul>\n<li><a href=\"#datacenters\">6.2 Datacenters</a>\n<li><a href=\"#georeplication\">6.3 Geo-Replication (Cross-Cluster Data Mirroring)</a>\n<ul>\n<li><a href=\"#georeplication-overview\">Geo-Replication Overview</a>\n<li><a href=\"#georeplication-flows\">What Are Replication Flows</a>\n<li><a href=\"#georeplication-mirrormaker\">Configuring Geo-Replication</a>\n<li><a href=\"#georeplication-starting\">Starting Geo-Replication</a>\n<li><a href=\"#georeplication-stopping\">Stopping Geo-Replication</a>\n<li><a href=\"#georeplication-apply-config-changes\">Applying Configuration Changes</a>\n<li><a href=\"#georeplication-monitoring\">Monitoring Geo-Replication</a>\n</li></li></li></li></li></li></li></ul>\n<li><a href=\"#multitenancy\">6.4 Multi-Tenancy</a>\n<ul>\n<li><a href=\"#multitenancy-overview\">Multi-Tenancy Overview</a>\n<li><a href=\"#multitenancy-topic-naming\">Creating User Spaces (Namespaces)</a>\n<li><a href=\"#multitenancy-topic-configs\">Configuring Topics</a>\n<li><a href=\"#multitenancy-security\">Securing Clusters and Topics</a>\n<li><a href=\"#multitenancy-isolation\">Isolating Tenants</a>\n<li><a href=\"#multitenancy-monitoring\">Monitoring and Metering</a>\n<li><a href=\"#multitenancy-georeplication\">Multi-Tenancy and Geo-Replication</a>\n<li><a href=\"#multitenancy-more\">Further considerations</a>\n</li></li></li></li></li></li></li></li></ul>\n<li><a href=\"#config\">6.5 Important Configs</a>\n<ul>\n<li><a href=\"#clientconfig\">Important Client Configs</a>\n<li><a href=\"#prodconfig\">A Production Server Configs</a>\n</li></li></ul>\n<li><a href=\"#java\">6.6 Java Version</a>\n<li><a href=\"#hwandos\">6.7 Hardware and OS</a>\n<ul>\n<li><a href=\"#os\">OS</a>\n<li><a href=\"#diskandfs\">Disks and Filesystems</a>\n<li><a href=\"#appvsosflush\">Application vs OS Flush Management</a>\n<li><a href=\"#linuxflush\">Linux Flush Behavior</a>\n<li><a href=\"#filesystems\">Filesystem Selection</a>\n<li><a href=\"#replace_disk\">Replace KRaft Controller Disk</a>\n</li></li></li></li></li></li></ul>\n<li><a href=\"#monitoring\">6.8 Monitoring</a>\n<ul>\n<li><a href=\"#remote_jmx\">Security Considerations for Remote Monitoring using JMX</a>\n<li><a href=\"#tiered_storage_monitoring\">Tiered Storage Monitoring</a>\n<li><a href=\"#kraft_monitoring\">KRaft Monitoring</a>\n<li><a href=\"#selector_monitoring\">Selector Monitoring</a>\n<li><a href=\"#common_node_monitoring\">Common Node Monitoring</a>\n<li><a href=\"#producer_monitoring\">Producer Monitoring</a>\n<li><a href=\"#consumer_monitoring\">Consumer Monitoring</a>\n<li><a href=\"#connect_monitoring\">Connect Monitoring</a>\n<li><a href=\"#kafka_streams_monitoring\">Streams Monitoring</a>\n<li><a href=\"#others_monitoring\">Others</a>\n</li></li></li></li></li></li></li></li></li></li></ul>\n<li><a href=\"#zk\">6.9 ZooKeeper</a>\n<ul>\n<li><a href=\"#zkversion\">Stable Version</a>\n<li><a href=\"#zk_depr\">ZooKeeper Deprecation</a>\n<li><a href=\"#zkops\">Operationalization</a>\n</li></li></li></ul>\n<li><a href=\"#kraft\">6.10 KRaft</a>\n<ul>\n<li><a href=\"#kraft_config\">Configuration</a>\n<li><a href=\"#kraft_storage\">Storage Tool</a>\n<li><a href=\"#kraft_debug\">Debugging</a>\n<li><a href=\"#kraft_deployment\">Deploying Considerations</a>\n<li><a href=\"#kraft_missing\">Missing Features</a>\n<li><a href=\"#kraft_zk_migration\">ZooKeeper to KRaft Migration</a>\n</li></li></li></li></li></li></ul>\n<li><a href=\"#tiered_storage\">6.11 Tiered Storage</a>\n<ul>\n<li><a href=\"#tiered_storage_overview\">Tiered Storage Overview</a>\n<li><a href=\"#tiered_storage_config\">Configuration</a>\n<li><a href=\"#tiered_storage_config_ex\">Quick Start Example</a>\n<li><a href=\"#tiered_storage_limitation\">Limitations</a>\n</li></li></li></li></ul>\n</li></li></li></li></li></li></li></li></li></li></li></ul>",
              "porder": 14
            },
            {
              "tag": "ul",
              "content": "<ul>\n<li><a href=\"#basic_ops_add_topic\">Adding and removing topics</a>\n<li><a href=\"#basic_ops_modify_topic\">Modifying topics</a>\n<li><a href=\"#basic_ops_restarting\">Graceful shutdown</a>\n<li><a href=\"#basic_ops_leader_balancing\">Balancing leadership</a>\n<li><a href=\"#basic_ops_racks\">Balancing Replicas Across Racks</a>\n<li><a href=\"#basic_ops_mirror_maker\">Mirroring data between clusters</a>\n<li><a href=\"#basic_ops_consumer_lag\">Checking consumer position</a>\n<li><a href=\"#basic_ops_consumer_group\">Managing Consumer Groups</a>\n<li><a href=\"#basic_ops_cluster_expansion\">Expanding your cluster</a>\n<li><a href=\"#basic_ops_decommissioning_brokers\">Decommissioning brokers</a>\n<li><a href=\"#basic_ops_increase_replication_factor\">Increasing replication factor</a>\n<li><a href=\"#rep-throttle\">Limiting Bandwidth Usage during Data Migration</a>\n<li><a href=\"#quotas\">Setting quotas</a>\n</li></li></li></li></li></li></li></li></li></li></li></li></li></ul>",
              "porder": 15
            },
            {
              "tag": "ul",
              "content": "<ul>\n<li><a href=\"#georeplication-overview\">Geo-Replication Overview</a>\n<li><a href=\"#georeplication-flows\">What Are Replication Flows</a>\n<li><a href=\"#georeplication-mirrormaker\">Configuring Geo-Replication</a>\n<li><a href=\"#georeplication-starting\">Starting Geo-Replication</a>\n<li><a href=\"#georeplication-stopping\">Stopping Geo-Replication</a>\n<li><a href=\"#georeplication-apply-config-changes\">Applying Configuration Changes</a>\n<li><a href=\"#georeplication-monitoring\">Monitoring Geo-Replication</a>\n</li></li></li></li></li></li></li></ul>",
              "porder": 16
            },
            {
              "tag": "ul",
              "content": "<ul>\n<li><a href=\"#multitenancy-overview\">Multi-Tenancy Overview</a>\n<li><a href=\"#multitenancy-topic-naming\">Creating User Spaces (Namespaces)</a>\n<li><a href=\"#multitenancy-topic-configs\">Configuring Topics</a>\n<li><a href=\"#multitenancy-security\">Securing Clusters and Topics</a>\n<li><a href=\"#multitenancy-isolation\">Isolating Tenants</a>\n<li><a href=\"#multitenancy-monitoring\">Monitoring and Metering</a>\n<li><a href=\"#multitenancy-georeplication\">Multi-Tenancy and Geo-Replication</a>\n<li><a href=\"#multitenancy-more\">Further considerations</a>\n</li></li></li></li></li></li></li></li></ul>",
              "porder": 17
            },
            {
              "tag": "ul",
              "content": "<ul>\n<li><a href=\"#clientconfig\">Important Client Configs</a>\n<li><a href=\"#prodconfig\">A Production Server Configs</a>\n</li></li></ul>",
              "porder": 18
            },
            {
              "tag": "ul",
              "content": "<ul>\n<li><a href=\"#os\">OS</a>\n<li><a href=\"#diskandfs\">Disks and Filesystems</a>\n<li><a href=\"#appvsosflush\">Application vs OS Flush Management</a>\n<li><a href=\"#linuxflush\">Linux Flush Behavior</a>\n<li><a href=\"#filesystems\">Filesystem Selection</a>\n<li><a href=\"#replace_disk\">Replace KRaft Controller Disk</a>\n</li></li></li></li></li></li></ul>",
              "porder": 19
            },
            {
              "tag": "ul",
              "content": "<ul>\n<li><a href=\"#remote_jmx\">Security Considerations for Remote Monitoring using JMX</a>\n<li><a href=\"#tiered_storage_monitoring\">Tiered Storage Monitoring</a>\n<li><a href=\"#kraft_monitoring\">KRaft Monitoring</a>\n<li><a href=\"#selector_monitoring\">Selector Monitoring</a>\n<li><a href=\"#common_node_monitoring\">Common Node Monitoring</a>\n<li><a href=\"#producer_monitoring\">Producer Monitoring</a>\n<li><a href=\"#consumer_monitoring\">Consumer Monitoring</a>\n<li><a href=\"#connect_monitoring\">Connect Monitoring</a>\n<li><a href=\"#kafka_streams_monitoring\">Streams Monitoring</a>\n<li><a href=\"#others_monitoring\">Others</a>\n</li></li></li></li></li></li></li></li></li></li></ul>",
              "porder": 20
            },
            {
              "tag": "ul",
              "content": "<ul>\n<li><a href=\"#zkversion\">Stable Version</a>\n<li><a href=\"#zk_depr\">ZooKeeper Deprecation</a>\n<li><a href=\"#zkops\">Operationalization</a>\n</li></li></li></ul>",
              "porder": 21
            },
            {
              "tag": "ul",
              "content": "<ul>\n<li><a href=\"#kraft_config\">Configuration</a>\n<li><a href=\"#kraft_storage\">Storage Tool</a>\n<li><a href=\"#kraft_debug\">Debugging</a>\n<li><a href=\"#kraft_deployment\">Deploying Considerations</a>\n<li><a href=\"#kraft_missing\">Missing Features</a>\n<li><a href=\"#kraft_zk_migration\">ZooKeeper to KRaft Migration</a>\n</li></li></li></li></li></li></ul>",
              "porder": 22
            },
            {
              "tag": "ul",
              "content": "<ul>\n<li><a href=\"#tiered_storage_overview\">Tiered Storage Overview</a>\n<li><a href=\"#tiered_storage_config\">Configuration</a>\n<li><a href=\"#tiered_storage_config_ex\">Quick Start Example</a>\n<li><a href=\"#tiered_storage_limitation\">Limitations</a>\n</li></li></li></li></ul>",
              "porder": 23
            },
            {
              "tag": "ul",
              "content": "<ul>\n<li><a href=\"#security_overview\">7.1 Security Overview</a>\n<li><a href=\"#listener_configuration\">7.2 Listener Configuration</a>\n<li><a href=\"#security_ssl\">7.3 Encryption and Authentication using SSL</a>\n<li><a href=\"#security_sasl\">7.4 Authentication using SASL</a>\n<li><a href=\"#security_authz\">7.5 Authorization and ACLs</a>\n<li><a href=\"#security_rolling_upgrade\">7.6 Incorporating Security Features in a Running Cluster</a>\n<li><a href=\"#zk_authz\">7.7 ZooKeeper Authentication</a>\n<ul>\n<li><a href=\"#zk_authz_new\">New Clusters</a>\n<ul>\n<li><a href=\"#zk_authz_new_sasl\">ZooKeeper SASL Authentication</a>\n<li><a href=\"#zk_authz_new_mtls\">ZooKeeper Mutual TLS Authentication</a>\n</li></li></ul>\n<li><a href=\"#zk_authz_migration\">Migrating Clusters</a>\n<li><a href=\"#zk_authz_ensemble\">Migrating the ZooKeeper Ensemble</a>\n<li><a href=\"#zk_authz_quorum\">ZooKeeper Quorum Mutual TLS Authentication</a>\n</li></li></li></li></ul>\n<li><a href=\"#zk_encryption\">7.8 ZooKeeper Encryption</a>\n</li></li></li></li></li></li></li></li></ul>",
              "porder": 24
            },
            {
              "tag": "ul",
              "content": "<ul>\n<li><a href=\"#zk_authz_new\">New Clusters</a>\n<ul>\n<li><a href=\"#zk_authz_new_sasl\">ZooKeeper SASL Authentication</a>\n<li><a href=\"#zk_authz_new_mtls\">ZooKeeper Mutual TLS Authentication</a>\n</li></li></ul>\n<li><a href=\"#zk_authz_migration\">Migrating Clusters</a>\n<li><a href=\"#zk_authz_ensemble\">Migrating the ZooKeeper Ensemble</a>\n<li><a href=\"#zk_authz_quorum\">ZooKeeper Quorum Mutual TLS Authentication</a>\n</li></li></li></li></ul>",
              "porder": 25
            },
            {
              "tag": "ul",
              "content": "<ul>\n<li><a href=\"#zk_authz_new_sasl\">ZooKeeper SASL Authentication</a>\n<li><a href=\"#zk_authz_new_mtls\">ZooKeeper Mutual TLS Authentication</a>\n</li></li></ul>",
              "porder": 26
            },
            {
              "tag": "ul",
              "content": "<ul>\n<li><a href=\"#connect_overview\">8.1 Overview</a>\n<li><a href=\"#connect_user\">8.2 User Guide</a>\n<ul>\n<li><a href=\"#connect_running\">Running Kafka Connect</a>\n<li><a href=\"#connect_configuring\">Configuring Connectors</a>\n<li><a href=\"#connect_transforms\">Transformations</a>\n<li><a href=\"#connect_rest\">REST API</a>\n<li><a href=\"#connect_errorreporting\">Error Reporting in Connect</a>\n<li><a href=\"#connect_exactlyonce\">Exactly-once support</a>\n<li><a href=\"#connect_plugindiscovery\">Plugin Discovery</a>\n</li></li></li></li></li></li></li></ul>\n<li><a href=\"#connect_development\">8.3 Connector Development Guide</a>\n<ul>\n<li><a href=\"#connect_concepts\">Core Concepts and APIs</a>\n<li><a href=\"#connect_developing\">Developing a Simple Connector</a>\n<li><a href=\"#connect_dynamicio\">Dynamic Input/Output Streams</a>\n<li><a href=\"#connect_configs\">Configuration Validation</a>\n<li><a href=\"#connect_schemas\">Working with Schemas</a>\n</li></li></li></li></li></ul>\n<li><a href=\"#connect_administration\">8.4 Administration</a>\n</li></li></li></li></ul>",
              "porder": 27
            },
            {
              "tag": "ul",
              "content": "<ul>\n<li><a href=\"#connect_running\">Running Kafka Connect</a>\n<li><a href=\"#connect_configuring\">Configuring Connectors</a>\n<li><a href=\"#connect_transforms\">Transformations</a>\n<li><a href=\"#connect_rest\">REST API</a>\n<li><a href=\"#connect_errorreporting\">Error Reporting in Connect</a>\n<li><a href=\"#connect_exactlyonce\">Exactly-once support</a>\n<li><a href=\"#connect_plugindiscovery\">Plugin Discovery</a>\n</li></li></li></li></li></li></li></ul>",
              "porder": 28
            },
            {
              "tag": "ul",
              "content": "<ul>\n<li><a href=\"#connect_concepts\">Core Concepts and APIs</a>\n<li><a href=\"#connect_developing\">Developing a Simple Connector</a>\n<li><a href=\"#connect_dynamicio\">Dynamic Input/Output Streams</a>\n<li><a href=\"#connect_configs\">Configuration Validation</a>\n<li><a href=\"#connect_schemas\">Working with Schemas</a>\n</li></li></li></li></li></ul>",
              "porder": 29
            },
            {
              "tag": "ul",
              "content": "<ul>\n<li><a href=\"/{{version}}/documentation/streams/quickstart\">9.1 Play with a Streams Application</a>\n<li><a href=\"/{{version}}/documentation/streams/tutorial\">9.2 Write your own Streams Applications</a>\n<li><a href=\"/{{version}}/documentation/streams/developer-guide\">9.3 Developer Manual</a>\n<li><a href=\"/{{version}}/documentation/streams/core-concepts\">9.4 Core Concepts</a>\n<li><a href=\"/{{version}}/documentation/streams/architecture\">9.5 Architecture</a>\n<li><a href=\"/{{version}}/documentation/streams/upgrade-guide\">9.6 Upgrade Guide</a>\n</li></li></li></li></li></li></ul>",
              "porder": 30
            },
            {
              "tag": "h1",
              "content": "<h1>Documentation</h1>",
              "porder": 31
            },
            {
              "tag": "h3",
              "content": "<h3>Kafka 3.9 Documentation</h3>",
              "porder": 32
            },
            {
              "tag": "h2",
              "content": "<h2 class=\"anchor-heading\"><a class=\"anchor-link\" id=\"gettingStarted\"></a><a href=\"#gettingStarted\">1. Getting Started</a></h2>",
              "porder": 33
            },
            {
              "tag": "h3",
              "content": "<h3 class=\"anchor-heading\"><a class=\"anchor-link\" id=\"introduction\"></a><a href=\"#introduction\">1.1 Introduction</a></h3>",
              "porder": 34
            },
            {
              "tag": "h4",
              "content": "<h4 class=\"anchor-heading\">\n<a class=\"anchor-link\" href=\"#intro_streaming\" id=\"intro_streaming\"></a>\n<a href=\"#intro_streaming\">What is event streaming?</a>\n</h4>",
              "porder": 35
            },
            {
              "tag": "p",
              "content": "<p>\n    Event streaming is the digital equivalent of the human body's central nervous system. It is the\n    technological foundation for the 'always-on' world where businesses are increasingly software-defined \n    and automated, and where the user of software is more software.\n  </p>",
              "porder": 36
            },
            {
              "tag": "p",
              "content": "<p>\n    Technically speaking, event streaming is the practice of capturing data in real-time from event sources\n    like databases, sensors, mobile devices, cloud services, and software applications in the form of streams\n    of events; storing these event streams durably for later retrieval; manipulating, processing, and reacting\n    to the event streams in real-time as well as retrospectively; and routing the event streams to different\n    destination technologies as needed. Event streaming thus ensures a continuous flow and interpretation of\n    data so that the right information is at the right place, at the right time.\n  </p>",
              "porder": 37
            },
            {
              "tag": "h4",
              "content": "<h4 class=\"anchor-heading\">\n<a class=\"anchor-link\" href=\"#intro_usage\" id=\"intro_usage\"></a>\n<a href=\"#intro_usage\">What can I use event streaming for?</a>\n</h4>",
              "porder": 38
            },
            {
              "tag": "p",
              "content": "<p>\n    Event streaming is applied to a <a href=\"/powered-by\">wide variety of use cases</a>\n    across a plethora of industries and organizations. Its many examples include:\n  </p>",
              "porder": 39
            },
            {
              "tag": "ul",
              "content": "<ul>\n<li>\n      To process payments and financial transactions in real-time, such as in stock exchanges, banks, and insurances.\n    </li>\n<li>\n      To track and monitor cars, trucks, fleets, and shipments in real-time, such as in logistics and the automotive industry.\n    </li>\n<li>\n      To continuously capture and analyze sensor data from IoT devices or other equipment, such as in factories and wind parks.\n    </li>\n<li>\n      To collect and immediately react to customer interactions and orders, such as in retail, the hotel and travel industry, and mobile applications.\n    </li>\n<li>\n      To monitor patients in hospital care and predict changes in condition to ensure timely treatment in emergencies.\n    </li>\n<li>\n      To connect, store, and make available data produced by different divisions of a company.\n    </li>\n<li>\n      To serve as the foundation for data platforms, event-driven architectures, and microservices.\n    </li>\n</ul>",
              "porder": 40
            },
            {
              "tag": "h4",
              "content": "<h4 class=\"anchor-heading\">\n<a class=\"anchor-link\" href=\"#intro_platform\" id=\"intro_platform\"></a>\n<a href=\"#intro_platform\">Apache Kafka® is an event streaming platform. What does that mean?</a>\n</h4>",
              "porder": 41
            },
            {
              "tag": "p",
              "content": "<p>\n    Kafka combines three key capabilities so you can implement\n    <a href=\"/powered-by\">your use cases</a>\n    for event streaming end-to-end with a single battle-tested solution:\n  </p>",
              "porder": 42
            },
            {
              "tag": "ol",
              "content": "<ol>\n<li>\n      To <strong>publish</strong> (write) and <strong>subscribe to</strong> (read) streams of events, including continuous import/export of\n      your data from other systems.\n    </li>\n<li>\n      To <strong>store</strong> streams of events durably and reliably for as long as you want.\n    </li>\n<li>\n      To <strong>process</strong> streams of events as they occur or retrospectively.\n    </li>\n</ol>",
              "porder": 43
            },
            {
              "tag": "p",
              "content": "<p>\n    And all this functionality is provided in a distributed, highly scalable, elastic, fault-tolerant, and\n    secure manner. Kafka can be deployed on bare-metal hardware, virtual machines, and containers, and on-premises\n    as well as in the cloud. You can choose between self-managing your Kafka environments and using fully managed\n    services offered by a variety of vendors.\n  </p>",
              "porder": 44
            },
            {
              "tag": "h4",
              "content": "<h4 class=\"anchor-heading\">\n<a class=\"anchor-link\" href=\"#intro_nutshell\" id=\"intro_nutshell\"></a>\n<a href=\"#intro_nutshell\">How does Kafka work in a nutshell?</a>\n</h4>",
              "porder": 45
            },
            {
              "tag": "p",
              "content": "<p>\n    Kafka is a distributed system consisting of <strong>servers</strong> and <strong>clients</strong> that\n    communicate via a high-performance <a href=\"/protocol.html\">TCP network protocol</a>.\n    It can be deployed on bare-metal hardware, virtual machines, and containers in on-premise as well as cloud\n    environments.\n  </p>",
              "porder": 46
            },
            {
              "tag": "p",
              "content": "<p>\n<strong>Servers</strong>: Kafka is run as a cluster of one or more servers that can span multiple datacenters\n    or cloud regions. Some of these servers form the storage layer, called the brokers. Other servers run\n    <a href=\"/documentation/#connect\">Kafka Connect</a> to continuously import and export\n    data as event streams to integrate Kafka with your existing systems such as relational databases as well as\n    other Kafka clusters. To let you implement mission-critical use cases, a Kafka cluster is highly scalable\n    and fault-tolerant: if any of its servers fails, the other servers will take over their work to ensure\n    continuous operations without any data loss.\n  </p>",
              "porder": 47
            },
            {
              "tag": "p",
              "content": "<p>\n<strong>Clients</strong>: They allow you to write distributed applications and microservices that read, write,\n    and process streams of events in parallel, at scale, and in a fault-tolerant manner even in the case of network\n    problems or machine failures. Kafka ships with some such clients included, which are augmented by\n    <a href=\"https://cwiki.apache.org/confluence/display/KAFKA/Clients\">dozens of clients</a> provided by the Kafka\n    community: clients are available for Java and Scala including the higher-level\n    <a href=\"/documentation/streams/\">Kafka Streams</a> library, for Go, Python, C/C++, and\n    many other programming languages as well as REST APIs.\n  </p>",
              "porder": 48
            },
            {
              "tag": "h4",
              "content": "<h4 class=\"anchor-heading\">\n<a class=\"anchor-link\" href=\"#intro_concepts_and_terms\" id=\"intro_concepts_and_terms\"></a>\n<a href=\"#intro_concepts_and_terms\">Main Concepts and Terminology</a>\n</h4>",
              "porder": 49
            },
            {
              "tag": "p",
              "content": "<p>\n    An <strong>event</strong> records the fact that \"something happened\" in the world or in your business. It is also called record or message in the documentation. When you read or write data to Kafka, you do this in the form of events. Conceptually, an event has a key, value, timestamp, and optional metadata headers. Here's an example event:\n  </p>",
              "porder": 50
            }];
            docData.current = data;
            if (data && Array.isArray(data)) {
              await addData(data, objectStoreName);
              console.log(data.length);
            } else {
              throw new Error("Invalid data format received from server");
            }
          } catch (error) {
            console.error("Failed to fetch data from server:", error);
            throw error;
          }
        } else {
          console.log("DB에 해당 문서 데이터가 있습니다.");
          setIsDbInitialized(true);
          docData.current = loadedData;
        }
      } catch (error) {
        console.error("Error in checkDB:", error);
        // 에러 상태를 관리하는 state가 있다면 여기서 설정
      } finally {
        setLoading(false);
      }
    }
    checkDB();
  }, []);

  // 문서 내용 전부 가져오기
  const loadMore = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      // 인위적인 지연 추가 (개발용)
      await new Promise((resolve) => setTimeout(resolve, 450));

      const data = docData.current;
      // console.log("Current processedCount:", processedCount);
      // console.log("Loading data from index:", processedCount, "to", processedCount + chunk_size);

      if (!data || data.length === 0) {
        console.log("오류 발생 : 데이터 없음");
        return;
      }

      const newChunk = data.slice(processedCount, processedCount + chunk_size);
      // console.log("New chunk length:", newChunk.length);

      if (!newChunk || newChunk.length === 0) {
        setHasMore(false);
        return;
      }
      //element.content가 null이나 undefined일 경우 ""로 대체 ==> React의 불변성 패턴
      const processedChunk = newChunk.map((element) => ({
        ...element,
        content: element.content || "",
      }));

      //전개 연산자 사용 : 두 배열을 쉽게 합칠 수 있음.
      setDocParts((prev) => [...prev, ...processedChunk]);
      setProcessedCount((prev) => prev + chunk_size);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );
    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }
    return () => observer.disconnect();
  }, [hasMore, loading, processedCount]);

  useEffect(() => {
    if (isDbInitialized) {
      loadMore();
    }
  }, [isDbInitialized]);

  return (
    <div className="h-[99%] border-black border-2 w-[70%] absolute top-1/2 left-1/2 -translate-1/2 overflow-x-hidden overflow-y-scroll p-4 flex flex-col">
      <div className="flex flex-col gap-4">
        {docParts.map((part, index) => (
          <div
            key={index}
            onClick={() => alert(part.porder)}
            dangerouslySetInnerHTML={{ __html: part.content }}
            className="bg-[#E4DCD4] cursor-pointer p-2 rounded-md text-[#424242] hover:bg-[#BCB2A8]flex flex-col"
          />
        ))}
      </div>

      <div ref={loadingRef} className="py-4 text-center">
        {loading && (
          <div className="flex justify-center items-center" role="status">
            <img
              className="w-[200px] h-[200px]"
              src={loadingGif}
              alt="로딩 애니메이션"
            />
          </div>
        )}
        {!hasMore && <div>모든 문서를 불러왔습니다.</div>}
      </div>
    </div>
  );
};

export default TranslateViewer;
